"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
  data: {
    id: number;
    image: string[];
    name: string;
    price: number;
  }[];
}

const Carousel = ({ data }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  const currentProduct = data[current];

  console.log(currentProduct.image[0]);
  return (
    <Card className="relative overflow-hidden shadow-md rounded-lg border-gray-300">
      {currentProduct.image && currentProduct.image[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.image[0]}
            alt={currentProduct.name}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center [background-image:linear-gradient(to_right,rgba(0,0,0,0.3),rgba(0,0,0,0.3))]">
        <CardTitle className="text-white text-3xl font-bold mb-2">{currentProduct.name}</CardTitle>
        <p className="text-white text-xl">$ {(currentProduct.price / 100).toFixed(2)}</p>
      </CardContent>
    </Card>
  );
};

export default Carousel;
