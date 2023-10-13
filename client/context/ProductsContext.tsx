"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import setCookies from "@/lib/setCookies";
import { ProductCardType } from "@/lib/types";

import { useAuth } from "./AuthContext";
import { useURLParams } from "./ParamsContext";

export const ProductsContext = createContext({} as IProductsContext);

export function useProducts() {
  return useContext(ProductsContext);
}

type ProductsResponseProps = {
  totalProducts: number;
  pageSize: number;
  pageNumber: number;
  products: ProductCardType[];
};

type ProductsContextProvider = {
  children: React.ReactNode;
};

type IProductsContext = {
  productsResponse: ProductsResponseProps;
  isLoading: boolean;
  fetchProducts: () => void;
  updateFavorites: (type: string, productId: number) => void;
};

export function ProductsProvider({ children }: ProductsContextProvider) {
  const {
    currentCategory,
    currentSubcategory,
    currentColor,
    currentBrand,
    priceFrom,
    priceTo,
    sort,
    q,
    pn,
  } = useURLParams();

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [productsResponse, setProductsResponse] =
    useState<ProductsResponseProps>({
      totalProducts: 0,
      pageSize: 20,
      pageNumber: 1,
      products: [],
    });

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line
  }, [
    user,
    currentCategory,
    currentSubcategory,
    currentColor,
    currentBrand,
    priceFrom,
    priceTo,
    sort,
    q,
    pn,
  ]);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const token = await setCookies({ type: "GET", tag: "token", data: "" });

      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            sort: sort,
            category: currentCategory,
            subcategory: currentSubcategory,
            brand: currentBrand,
            color: currentColor,
            priceFrom: priceFrom,
            priceTo: priceTo,
            pn: pn,
            q: q,
          },
        })
        .then((response) => {
          setProductsResponse(response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateFavorites(type: string, productId: number) {
    const token = await setCookies({ type: "GET", tag: "token", data: "" });

    if (type === "add") {
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/add/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (type === "delete") {
      axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/favorites/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  }

  return (
    <ProductsContext.Provider
      value={{ productsResponse, isLoading, fetchProducts, updateFavorites }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
