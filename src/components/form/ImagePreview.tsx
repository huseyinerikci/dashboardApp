"use client";
import { useEffect, useState } from "react";
import Field from "./Field";
import Image from "next/image";

type Props = {
  imageInputId: string;
};

const ImagePreview = ({ imageInputId }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const imageInput = document.getElementById(
      imageInputId
    ) as HTMLInputElement;

    //input değişme anı çalışacak fonksiyon
    const handleChange = () => {
      const newUrl = imageInput.value;
      setImageUrl(newUrl);

      if (newUrl) {
        //url'in geçerli olduğunu kontrol et
        const testImage = new globalThis.Image();

        //resim yüklenme kontrolü
        testImage.onload = () => {
          setIsValid(true);
          setIsLoading(false);
        };

        //resim yüklenmediği kontrolü
        testImage.onerror = () => {
          setIsValid(false);
          setIsLoading(false);
        };

        //resmin kaynağını ayarla
        testImage.src = newUrl;
      } else {
        setIsValid(false);
        setIsLoading(false);
      }
    };
    //input olay izleyicisi ekle
    if (imageInput) {
      imageInput.addEventListener("input", handleChange);
      handleChange();
    }
    //compenent unmount anı izleyici temizle
    return () => {
      if (imageInput) {
        imageInput.removeEventListener("input", handleChange);
      }
    };
  }, [imageInputId]);
  return (
    <Field htmlFor={imageInputId} label="Resim Önizleme">
      <div className="relative h-48 w-full bg-gray-100 rounded-md overflow-hidden">
        {isLoading ? (
          <div>Resim Yükleniyor</div>
        ) : isValid && imageUrl ? (
          <Image
            src={imageUrl}
            alt="Resim Önizleme"
            fill
            unoptimized
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {imageUrl ? "Geçersiz Resim URL" : "Resim Yok"}
          </div>
        )}
      </div>
    </Field>
  );
};

export default ImagePreview;
