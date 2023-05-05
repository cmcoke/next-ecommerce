import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";

export default function Product({ searchParams }: SearchParamTypes) {
  // console.log(props)

  // console.log(searchParams); // searchParamas comes from props

  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image src={searchParams.image} alt={searchParams.name} width={600} height={600} priority={true} className="w-full rounded-lg" />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
