"use client";

import { deleteUser } from "@/utils/service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const BanButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Bu kullanıcıyı silmek istiyor musunuz?")) return;
    setIsLoading(true);
    deleteUser(id)
      .then(() => {
        toast.success("Kullanıcı silindi");
        router.refresh();
      })
      .catch(() => {
        toast.error("Kullanıcı silinemedi!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <button
      disabled={isLoading}
      onClick={handleDelete}
      className="button text-red-500 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {isLoading ? <FaSpinner className="animate-spin" /> : <FaTrash />}
    </button>
  );
};

export default BanButton;
