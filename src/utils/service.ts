import { Order, Product } from "@/types";

const BaseURL = "http://localhost:9090";

//tüm siparişleri getir
const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BaseURL}/orders`);

  return res.json();
};

//tüm ürünleri getir
const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BaseURL}/products`);

  return res.json();
};

//tek bir  ürün getir
const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${BaseURL}/products/${id}`);

  return res.json();
};

//ürün sil
const deleteProducts = async (id: string): Promise<void> => {
  const res = await fetch(`${BaseURL}/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

//ütrün oluştur
const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const res = await fetch(`${BaseURL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return res.json();
};
export { getOrders, getProducts, deleteProducts, createProduct, getProduct };
