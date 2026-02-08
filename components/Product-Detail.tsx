'use client';

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface Product {
  id: number;
  image: string[];
  name: string;
  price: number;
  description: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { state, addItem, updateQuantity } = useCart();
  const cartItem = state.items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleIncrement = () => {
    if (quantity === 0) {
      handleAddToCart();
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden flex justify-center">
        {/* Product Image */}
        <Image
          src={product.image[0]}
          alt={product.name}
          width={320}
          height={200}
          className="transition duration-300 hover:opacity-90 object-contain"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-gray-900">${(product.price / 100).toFixed(2)}</p>
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="outline" onClick={handleDecrement} disabled={quantity === 0}>
            -
          </Button>
          <span className="text-lg font-semibold min-w-[2rem] text-center">
            {quantity}
          </span>
          <Button onClick={handleIncrement}>
            +
          </Button>
        </div>
        {quantity > 0 && (
          <p className="text-sm text-green-600 font-medium">
            Added to cart! Total: ${((product.price * quantity) / 100).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
