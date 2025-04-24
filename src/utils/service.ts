import { Order, Product } from "@/types";

const BaseURL = "http://localhost:9090";

const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BaseURL}/orders`);

  return res.json();
};

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BaseURL}/products`);

  return res.json();
};

export { getOrders, getProducts };
