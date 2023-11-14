import { AiFillCaretDown } from "react-icons/ai";
import { useState, FormEvent } from "react";

import { usePathname, useRouter } from "next/navigation";

import { brands, categories, colors, subcategories } from "@/lib/constants";
import { useURLParams } from "@/context/ParamsContext";

export default function FilterTab() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams } = useURLParams();

  const {
    currentCategory,
    currentColor,
    currentSubcategory,
    currentBrand,
    createQueryString,
  } = useURLParams();

  const [toggleCategory, setToggleCategory] = useState(true);
  const [toggleSubcategory, setToggleSubcategory] = useState(false);
  const [toggleBrand, setToggleBrand] = useState(false);
  const [toggleColor, setToggleColor] = useState(false);

  const handlePrice = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const from = data.get("priceFrom") as string;
    const to = data.get("priceTo") as string;

    const queryParams = new URLSearchParams(searchParams);

    if (from !== "") {
      queryParams.set("priceFrom", from);
    }

    if (to !== "") {
      queryParams.set("priceTo", to);
    }

    const queryString = queryParams.toString();

    router.replace(pathname + (queryString ? `?${queryString}` : ""), {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col h-full select-none gap-2">
      <div className="flex flex-col border-y cursor-pointer">
        <div
          onClick={() => setToggleCategory(!toggleCategory)}
          className="flex w-full justify-between items-center p-2"
        >
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Category</span>
            <span>{currentCategory ? currentCategory : "Any"}</span>
          </div>
          <AiFillCaretDown
            className={
              "transition-all ease-linear duration-[250ms] " +
              (toggleCategory ? " -rotate-180" : "")
            }
            size={20}
          />
        </div>
        <ul
          className={
            " flex flex-col transition-all ease-linear overflow-auto scrollbar-cart" +
            (toggleCategory ? "  h-[150px]" : "  h-[0px]")
          }
        >
          <li
            onClick={() =>
              router.replace(
                pathname + "?" + createQueryString("category", "Any"),
                {
                  scroll: false,
                }
              )
            }
            className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
          >
            <div className="w-[16px] h-[2px] bg-gray-500 mx-2" />
            Any
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() =>
                router.replace(
                  pathname +
                    "?" +
                    createQueryString("category", category as string),
                  {
                    scroll: false,
                  }
                )
              }
              className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
            >
              <div className="w-[16px] h-[2px] bg-gray-500 mx-2" /> {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col border-y cursor-pointer">
        <div
          onClick={() => setToggleSubcategory(!toggleSubcategory)}
          className="flex w-full justify-between items-center p-2"
        >
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Subcategory</span>
            <span>{currentSubcategory ? currentSubcategory : "Any"}</span>
          </div>
          <AiFillCaretDown
            className={
              "transition-all ease-linear duration-[250ms] " +
              (toggleSubcategory ? " -rotate-180" : "")
            }
            size={20}
          />
        </div>
        <ul
          className={
            " flex flex-col transition-all ease-linear overflow-auto scrollbar-cart" +
            (toggleSubcategory ? "  h-[150px]" : "  h-[0px]")
          }
        >
          <li
            onClick={() =>
              router.replace(
                pathname + "?" + createQueryString("subcategory", "Any"),
                {
                  scroll: false,
                }
              )
            }
            className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
          >
            <div className="w-[16px] h-[2px] bg-gray-500 mx-2" />
            Any
          </li>
          {subcategories.map((subcategory, index) => (
            <li
              key={index}
              onClick={() =>
                router.replace(
                  pathname +
                    "?" +
                    createQueryString("subcategory", subcategory),
                  {
                    scroll: false,
                  }
                )
              }
              className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
            >
              <div className="w-[16px] h-[2px] bg-gray-500 mx-2" />
              {subcategory}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col border-y cursor-pointer">
        <div
          onClick={() => setToggleBrand(!toggleBrand)}
          className="flex w-full justify-between items-center p-2"
        >
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Brands</span>
            <span>{currentBrand ? currentBrand : "Any"}</span>
          </div>
          <AiFillCaretDown
            className={
              "transition-all ease-linear duration-[250ms] " +
              (toggleBrand ? " -rotate-180" : "")
            }
            size={20}
          />
        </div>
        <ul
          className={
            " flex flex-col transition-all ease-linear overflow-auto scrollbar-cart" +
            (toggleBrand ? "  h-[150px]" : "  h-[0px]")
          }
        >
          <li
            onClick={() =>
              router.replace(
                pathname + "?" + createQueryString("brand", "Any"),
                {
                  scroll: false,
                }
              )
            }
            className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
          >
            <div className="w-[16px] h-[2px] bg-gray-500 mx-2" />
            Any
          </li>
          {brands.map((brand, index) => (
            <li
              key={index}
              onClick={() =>
                router.replace(
                  pathname + "?" + createQueryString("brand", brand),
                  {
                    scroll: false,
                  }
                )
              }
              className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
            >
              <div className="w-[16px] h-[2px] bg-gray-500 mx-2" />
              {brand}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col border-y cursor-pointer">
        <div
          onClick={() => setToggleColor(!toggleColor)}
          className="flex w-full justify-between items-center p-2"
        >
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Color</span>
            <div className="flex items-center justify-center gap-2">
              <div
                className="border w-[16px] h-[16px] rounded-full"
                style={{
                  backgroundColor: colors.find(
                    (color) => color.label == currentColor
                  )?.hex,
                }}
              />
              <span>{currentColor ? currentColor : "Any"}</span>
            </div>
          </div>
          <AiFillCaretDown
            className={
              "transition-all ease-linear duration-[250ms] " +
              (toggleColor ? " -rotate-180" : "")
            }
            size={20}
          />
        </div>
        <ul
          className={
            " flex flex-col transition-all ease-linear overflow-auto scrollbar-cart" +
            (toggleColor ? "  h-[150px]" : "  h-[0px]")
          }
        >
          <li
            onClick={() =>
              router.replace(
                pathname + "?" + createQueryString("color", "Any"),
                {
                  scroll: false,
                }
              )
            }
            className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
          >
            <div className="w-[16px] h-[2px] bg-gray-500 mx-2" />
            Any
          </li>
          {colors.map((color, index) => (
            <li
              key={index}
              onClick={() =>
                router.replace(
                  pathname + "?" + createQueryString("color", color.label),
                  {
                    scroll: false,
                  }
                )
              }
              className="flex items-center border-t border-gray-200 p-1 hover:bg-black/5"
            >
              <div
                className="border w-[16px] h-[16px] rounded-full mx-2"
                style={{ backgroundColor: color.hex }}
              />
              {color.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col border-y gap-1 p-2">
        <span>Price</span>
        <form onSubmit={handlePrice}>
          <div className="flex justify-center gap-3">
            <input
              className="w-full border px-2 py-1 focus:border-black"
              placeholder="From"
              type="number"
              name="priceFrom"
              min={0}
            />
            <input
              className="w-full border px-2 py-1 focus:border-black"
              placeholder="To"
              type="number"
              name="priceTo"
              min={0}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full border border-black bg-white text-black font-semibold cursor-pointer mt-1 p-1 transition-all ease-linear hover:bg-black hover:text-white"
          >
            Apply
          </button>
        </form>
      </div>
      <div
        onClick={() => router.push("/products")}
        className="flex justify-center items-center w-8/12 mx-auto bg-black text-white font-semibold cursor-pointer p-2 mb-2"
      >
        Clear
      </div>
    </div>
  );
}
