'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";

const Navbar = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = ()=> {
      if(window.innerWidth >= 768){
        setMobileNavOpen(false)
      }
    };
    window.addEventListener("resize",handleResize);

    return ()=> window.addEventListener("resize",handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600">
          My Ecommerce
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative hover:text-blue-600">
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Button variant="ghost" onClick={()=>setMobileNavOpen((prev)=> !prev)} className="md:hidden">
            {mobileNavOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      {mobileNavOpen && (
              <nav className="md:hidden bg-white shadow-md">
              <ul className="flex flex-col p-4 space-y-2">
                <li>
                  <Link href="/" className="block hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="block hover:text-blue-600">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" className="block hover:text-blue-600">
                    Checkout
                  </Link>
                </li>
              </ul>
            </nav>
            )}
    </nav>
  );
};

export default Navbar;
