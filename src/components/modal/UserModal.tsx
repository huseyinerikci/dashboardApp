import { getUser } from "@/utils/service";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MdClose } from "react-icons/md";

type Props = {
  userId: string;
};

const UserModal = async ({ userId }: Props) => {
  const user = await getUser(userId);

  const fields = [
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Telefon",
      value: user.phone,
    },
    {
      label: "Ülke",
      value: user.address.country,
    },
    {
      label: "Şehir",
      value: user.address.city,
    },
    {
      label: "Adress",
      value: user.address.street,
    },
    {
      label: "Posta Kodu",
      value: user.address.postal_code,
    },
    {
      label: "Sipariş Sayısı",
      value: user.orders.length,
    },
  ];
  if (!user) return notFound();
  return (
    <div className="fixed bg-black/10 inset-0 grid place-items-center z-[999] backdrop-blur-[2px]">
      <div className="bg-white rounded-lg py-6 px-10 pb-14 w-full max-w-md">
        <div className="flex justify-between items-center border-b border-zinc-300 pb-3">
          <h1 className="text-2xl font-bold">Kullanıcı Bilgileri</h1>
          <Link href="/users" className="button">
            <MdClose />
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-center my-6">
            {user.name}
          </h1>
          <div className="flex flex-col gap-3 mb-5">
            {fields.map((field, key) => (
              <div key={key} className="flex justify-between">
                <span>{field.label}</span>
                <span className="font-semibold">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        {/* Sipari Detayları */}
        <div>
          {user.orders.length > 0 ? (
            <div>
              <div className="grid grid-cols-3 text-center mt-5">
                <span>Ürün Id</span>
                <span>Adet</span>
                <span>Toplam Fiyat</span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {user.orders.map((order, key) => (
                  <div
                    key={key}
                    className="grid grid-cols-3 font-semibold text-center bg-gray-100 p-2 rounded-lg"
                  >
                    <span>{order.product_id}</span>
                    <span>{order.quantity}</span>
                    <span>{order.total_price}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center bg-gray-100 rounded-md p-5 mt-3 font-bold text-zinc-800">
              Herhangi bir sipariş verilmemiştir.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
