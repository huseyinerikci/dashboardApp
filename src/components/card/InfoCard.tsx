import { InfoCardItem } from "@/types";
import Image from "next/image";

type Props = {
  item: InfoCardItem;
};

const InfoCard = ({ item }: Props) => {
  return (
    <div className="bg-white rounded-lg flex justify-between items-center p-3">
      <div>
        <h4 className="text-base sm:text-sm text-gray-700 whitespace-nowrap">
          {item.label}
        </h4>
        <p className="text-xl md:text-2xl font-bold">{item.value}</p>
      </div>
      <Image src={item.icon} alt={item.label} width={56} height={56} />
    </div>
  );
};

export default InfoCard;
