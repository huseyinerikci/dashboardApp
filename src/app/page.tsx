import icon1 from "@/assets/images/icon-1.webp";
import icon2 from "@/assets/images/icon-2.webp";
import icon3 from "@/assets/images/icon-3.webp";
import icon4 from "@/assets/images/icon-4.png";
import InfoCard from "@/components/card/InfoCard";
import CategoryChart from "@/components/home/CategoryChart";
import SalesChart from "@/components/home/SalesChart";
import { InfoCardItem } from "@/types";
import { getTotalValues } from "@/utils/service";
const Home = async () => {
  const values = await getTotalValues();
  const cards: InfoCardItem[] = [
    {
      icon: icon1,
      label: "Toplam Kullanıcı",
      value: values.total_user * 51,
    },
    {
      icon: icon2,
      label: "Toplam Sipariş",
      value: values.total_order * 51,
    },
    {
      icon: icon3,
      label: "Toplam Satış",
      value: (values.total_price * 51).toLocaleString() + "$",
    },
    {
      icon: icon4,
      label: "Toplam Ürün",
      value: values.total_product * 51,
    },
  ];

  return (
    <div className="page">
      <h1 className="title">Admin Paneli</h1>
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
        {cards.map((i, key) => (
          <InfoCard key={key} item={i} />
        ))}
      </section>

      <section className="grid  lg:grid-cols-14 gap-5 my-10">
        <div className="lg:col-span-9">
          <SalesChart />
        </div>
        <div className="lg:col-span-5">
          <CategoryChart />
        </div>
      </section>
    </div>
  );
};

export default Home;
