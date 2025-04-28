import ImagePreview from "@/components/form/ImagePreview";
import { categories, inputs } from "@/utils/constants";
import Link from "next/link";
import Field from "../../../components/form/Field";
import { Product } from "@/types";
import { createProduct } from "@/utils/service";
import { redirect } from "next/navigation";
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
  const formDataObject = {
    ...rawData,
    price: Number(rawData.price),
    stock: Number(rawData.stock),
    rating: Number(rawData.rating),
    reviews_count: Number(rawData.reviews_count),
  } as unknown as Omit<Product, "id">;

  try {
    await createProduct(formDataObject);
    redirect("/products");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log(error);
    throw new Error("Ürün oluşturma hatası");
  }
};

const ProductForm = () => {
  return (
    <form action={handleSubmit} className="space-y-6">
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
              />
            </Field>
          ))}
          <Field htmlFor="category" label="Kategori">
            <select
              name="category"
              id="category"
              className="input py-3"
              required
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
            ></textarea>
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-blue-500 px-6 py-2 rounded-md text-white  hover:bg-blue-600 transition-colors  disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer">
          Gönder
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
  return (
    <div className="page container mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="title">Yeni ürün oluştur</h1>

        <Link
          href={"/products"}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Geri
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm />
      </div>
    </div>
  );
};

export default FormPage;
