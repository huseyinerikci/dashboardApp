import React from "react";
import DoughnutGraph from "../graphic/DoughnutGraph";
import { getProducts } from "@/utils/service";
import { ChartData } from "@/types";

const CategoryChart = async () => {
  const products = await getProducts();

  const labels = [...new Set(products.map((product) => product.category))];

  //ürünleri kategoriye göre(kaç tane olduğunu say) grupla
  const object: Record<string, number> = {};

  products.forEach((product) => {
    object[product.category] = (object[product.category] || 0) + 1;
  });

  const data: ChartData = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(object),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  return (
    <div className="bg-white rounded-lg p-5">
      <h2 className="subtitle">Kategori Grafiği</h2>
      <DoughnutGraph data={data} />
    </div>
  );
};

export default CategoryChart;
