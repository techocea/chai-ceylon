import React from "react";
import MenuGallery from "./MenuGallery";
import { MENU_ITEMS } from "@/lib/constants";

const MenuSection = () => {
  return (
    <section className="wrapper">
      <div className="flex-center">
        <h3 className="heading">Our Menu</h3>
        <p className="sub-heading max-w-lg">Beverage that heals your soul</p>
      </div>
      <div className="mt-12 flex flex-col-reverse gap-24 lg:gap-10 lg:flex-row w-full">
        <div className="flex-1 flex flex-col gap-10">
          {MENU_ITEMS.map(({ id, label, price }) => (
            <div
              key={id}
              className="flex items-center justify-between border-b border-gray-200"
            >
              <h3 className="title">{label}</h3>
              <p className="text-xl font-bold">${price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
