import { Order, Product, User } from "@/types";

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

//ürün güncelle
const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const res = await fetch(`${BaseURL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return res.json();
};

//ürün sil
const deleteProducts = async (id: string): Promise<void> => {
  const res = await fetch(`${BaseURL}/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

//ürün oluştur
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

//tüm kullanıcıları getir
const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BaseURL}/users`);
  return res.json();
};

//bir kullanıcıyı getir
const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`${BaseURL}/users/${id}`);
  return res.json();
};

//kullanıcı sil
const deleteUser = async (id: string): Promise<void> => {
  const res = await fetch(`${BaseURL}/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

//anasayfadaki toplam veriler
const getTotalValues = async () => {
  const users = await getUsers();
  const orders = await getOrders();
  const products = await getProducts();

  return {
    total_user: users.length,
    total_order: orders.length,
    total_product: products.length,
    total_price: orders.reduce((acc, order) => acc + order.total_price, 0),
  };
};

export {
  getOrders,
  getProducts,
  deleteProducts,
  createProduct,
  getProduct,
  updateProduct,
  getUsers,
  deleteUser,
  getUser,
  getTotalValues,
};
