import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: {
    id: number;
    image: string[];
    name: string;
    price: number;
    description: string;
  };
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.image && product.image[0] && (
          <div className="relative h-full w-full flex justify-center items-center overflow-hidden">
            <Image
              src={product.image[0]}
              alt={product.name}
              width={320}
              height={200}
              className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg object-contain block"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.name}
          </CardTitle>
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            {product.description && (
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>
            )}
            <p className="text-xl font-semibold text-gray-900">
              $ {(product.price / 100).toFixed(2)}
            </p>
            <Button className="mt-4 bg-black text-white">View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProductCard;
