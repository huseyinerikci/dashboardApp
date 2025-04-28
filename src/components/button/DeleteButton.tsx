"use client";
import { deleteProducts } from "@/utils/service";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Ürünü silmek istediğinize emin misiniz?")) return;

    try {
      setIsLoading(true);
      await deleteProducts(id);
      router.refresh();
      alert("işlem başarılı");
    } catch (error) {
      alert("işlemm başarıssız");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      disabled={isLoading}
      onClick={handleDelete}
      className={`bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors w-19 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer`}
    >
      Sil
    </button>
  );
};

export default DeleteButton;
