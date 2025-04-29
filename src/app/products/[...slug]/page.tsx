import ImagePreview from "@/components/form/ImagePreview";
import { categories, inputs } from "@/utils/constants";
import Link from "next/link";
import Field from "../../../components/form/Field";
import { Product } from "@/types";
import { createProduct, getProduct, updateProduct } from "@/utils/service";
import { notFound, redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const handleSubmit = async (formData: FormData) => {
  "use server";
  const rawData = Object.fromEntries(formData.entries());
  /*
  const name  = formData.get("name") as string;
  /diğer değerleride bu şekilde tanımlayıp sonra
  const productData:Omit<Product, "id">={
    name, 
    price:parseFloat(price),
    stock:parseInt(stock)
    /ve diğerleri
  }
/sonra createProduct(productData) çağır
*/

  // id'yi string olarak alıyoruz ve tip kontrolü yapıyoruz
  const id = typeof rawData.id === "string" ? rawData.id : undefined;
  const formDataObject = {
    ...rawData,
    price: Number(rawData.price),
    stock: Number(rawData.stock),
    rating: Number(rawData.rating),
    reviews_count: Number(rawData.reviews_count),
  } as unknown as Omit<Product, "id">;

  try {
    if (id) {
      await updateProduct(id, formDataObject);
    } else {
      await createProduct(formDataObject);
    }

    redirect("/products");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error);
    throw new Error("Ürün oluşturma hatası");
  }
};

const ProductForm = ({ product }: { product: Product | null }) => {
  return (
    <form action={handleSubmit} className="space-y-6">
      {/* !***  düzenleme modunda handle submit içerisinde id'yi aktarmak için inputu gizliyoruz */}
      {product && <input type="hidden" name="id" value={product?.id} />}

      <div className="grid md:grid-cols-2 gap-6">
        {/* sol sütun */}
        <div className="space-y-6">
          {inputs.map((input, key) => (
            <Field key={key} htmlFor={input.name} label={input.label}>
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                className="input"
                required
                defaultValue={product?.[input.name as keyof Product]}
              />
            </Field>
          ))}
          <Field htmlFor="category" label="Kategori">
            <select
              name="category"
              id="category"
              className="input py-3"
              required
              defaultValue={product?.category}
            >
              <option value="">Kategori Seçiniz</option>
              {categories.map((i, key) => (
                <option key={key} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </Field>
        </div>
        {/* sağ sütun */}
        <div className="space-y-6">
          {/* resim */}
          <Field htmlFor="image_url" label="Resim URL">
            <input
              type="text"
              name="image_url"
              id="image_url"
              className="input"
              required
              defaultValue={product?.image_url}
            />
          </Field>
          <ImagePreview imageInputId="image_url" />
          {/* açıklama */}
          <Field htmlFor="description" label="Açıklama">
            <textarea
              name="description"
              id="description"
              className="input sm:text-sm md:min-h-[220px]"
              rows={5}
              required
              defaultValue={product?.description}
            ></textarea>
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-blue-500 px-6 py-2 rounded-md text-white  hover:bg-blue-600 transition-colors  disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer">
          {product ? "Güncelle" : "Gönder"}
        </button>
      </div>
    </form>
  );
};

type Props = {
  params: Promise<{ slug: string[] }>;
};
const FormPage = async ({ params }: Props) => {
  const { slug } = await params;
  let product: Product | null = null;

  if (slug[0] === "edit" && slug[1]) {
    try {
      product = await getProduct(slug[1]);
      if (!product) notFound();
    } catch (error) {
      notFound();
    }
  }

  const pageTitle = product ? "Ürünü Düzenle" : "Yeni ürün oluştur";

  return (
    <div className="page container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="title">{pageTitle}</h1>

        <Link
          href={"/products"}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Geri
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
};

export default FormPage;
