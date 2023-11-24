"use client";

import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useAuth } from "@/context/AuthContext";

import SearchBar from "./SearchBar";
import MobileCategories from "./Categories/Mobile";
import Categories from "./Categories";

export default function Navbar() {
  const router = useRouter();

  const { openCart, cartQuantity } = useShoppingCart();
  const { authenticated } = useAuth();

  const [isCategoriesVisible, setCategoriesVisible] = useState<boolean>(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-1">
        <div className="flex flex-col mx-3">
          <div className="flex items-center justify-end mt-1">
            <div className="flex gap-3 text-xs text-gray-500">
              <Link className="hover:text-gray-600" href="./">
                About us
              </Link>
              <Link className="hover:text-gray-700" href="./">
                Help & Support
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between my-2">
            <div className="flex flex-row justify-between items-center my-1">
              <div
                onClick={() => setCategoriesVisible(true)}
                className="flex md:hidden items-center justify-center cursor-pointer"
              >
                <AiOutlineMenu size={28} />
              </div>
              <MobileCategories
                isCategoriesVisible={isCategoriesVisible}
                setCategoriesVisible={setCategoriesVisible}
              />
              <Link className="mx-3" href="/">
                <div className="relative aspect-square w-8 h-8 overflow-hidden my-2 sm:my-0">
                  <Image
                    fill
                    src="/assets/logo.png"
                    alt="Logo"
                    className="object-contain w-full h-full"
                    sizes="(min-width: 320px) 50vw, 100vw"
                  />
                </div>
              </Link>
              <div
                onClick={openCart}
                className="relative flex md:hidden items-center justify-center cursor-pointer"
              >
                {cartQuantity > 0 && (
                  <div className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[8px] bg-black text-white font-bold rounded-full">
                    <span>{cartQuantity > 9 ? "9+" : cartQuantity}</span>
                  </div>
                )}
                <AiOutlineShopping size={28} />
              </div>
            </div>
            <SearchBar />
            <div className="hidden md:flex justify-center items-center gap-4 mt-3 md:mt-0">
              {authenticated ? (
                <div
                  onClick={() => router.push("/profile")}
                  className="w-16 flex flex-col justify-center items-center text-center text-gray-800 cursor-pointer hover:text-black"
                >
                  <AiOutlineUser size={24} />
                  <b className="text-xs">Profile</b>
                </div>
              ) : (
                <div
                  onClick={() => router.push("/login")}
                  className="w-16 flex flex-col justify-center items-center text-center text-gray-800 cursor-pointer hover:text-black"
                >
                  <AiOutlineUser size={24} />
                  <b className="text-xs">Log in</b>
                </div>
              )}
              <div
                onClick={() => router.push("/favorites")}
                className="w-16 flex flex-col justify-center items-center text-center text-gray-800 cursor-pointer hover:text-black"
              >
                <AiOutlineHeart size={24} />
                <b className="text-xs">Favorites</b>
              </div>
              <div
                onClick={openCart}
                className="relative w-16 flex flex-col justify-center items-center text-center text-gray-800 cursor-pointer hover:text-black"
              >
                {cartQuantity > 0 && (
                  <div className="absolute top-0 right-[16px] flex items-center justify-center w-4 h-4 text-[8px] bg-gray-800 text-white font-bold rounded-full">
                    <span>{cartQuantity > 9 ? "9+" : cartQuantity}</span>
                  </div>
                )}
                <AiOutlineShopping size={24} />
                <b className="text-xs">Shop Cart</b>
              </div>
            </div>
          </div>
          <Categories />
        </div>
      </div>
    </header>
  );
}
