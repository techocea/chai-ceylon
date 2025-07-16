"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading from "@/components/common/Heading";
import { useEffect, useState } from "react";
import axios from "axios";

interface MenuItem {
  _id?: string;
  name: string;
  price: number;
  description?: string;
}

interface MenuSectionProps {
  _id?: string;
  category: string;
  products: MenuItem[];
}

interface RenderTypeProps {
  renderType: "home" | "menu";
}

type MenuDataState = MenuSectionProps[] | null;
const MenuSection = ({ renderType }: RenderTypeProps) => {
  const [menuData, setMenuData] = useState<MenuDataState>(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await axios.get<{ menu: MenuSectionProps[] }>("/api/menu");
        if (res.status === 200 && res.data && Array.isArray(res.data.menu)) {
          setMenuData(res.data.menu);
          console.log({ menu: res.data.menu });
        } else {
          console.error("Error in fetching Menu Data");
          setMenuData([]);
        }
      } catch (error) {
        console.error("Error in fetching Menu Data:", error);
        setMenuData([]);
      }
    };
    fetchMenuData();
  }, []);

  return (
    <section className="wrapper lg:py-0">
      <div className="flex-center space-y-16 w-full">
        <div className="lg:max-w-2xl w-full space-y-24">
          {renderType === "home" ? (
            <>
              {menuData?.slice(0, 1).map((categoryItem) => (
                <div
                  key={categoryItem._id || categoryItem.category}
                  className="lg:max-w-2xl w-full space-y-6"
                >
                  <Heading title={categoryItem.category} description={""} />
                  <div className="flex flex-col gap-4">
                    {categoryItem.products.map((product) => (
                      <div
                        key={product._id || product.name}
                        className="flex items-center justify-between border-b border-gray-200 pb-2"
                      >
                        <div className="flex flex-col">
                          <h3 className="text-sm lg:text-lg max-w-fit w-full lg:max-w-xl">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-xs text-gray-500 mt-1 max-w-[300px] lg:max-w-full">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <p className="text-sm lg:text-lg font-bold">
                          {product.price} LKR
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {menuData?.map((categoryItem) => (
                <div
                  key={categoryItem._id || categoryItem.category}
                  className="lg:max-w-2xl w-full space-y-6"
                >
                  <Heading title={categoryItem.category} description={""} />
                  <div className="flex flex-col gap-4">
                    {categoryItem.products.map((product) => (
                      <div
                        key={product._id || product.name}
                        className="flex items-center justify-between border-b border-gray-200 pb-2"
                      >
                        <div className="flex flex-col">
                          <h3 className="text-sm lg:text-lg max-w-fit w-full lg:max-w-xl">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-xs text-gray-500 mt-1 max-w-[300px] lg:max-w-full">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <p className="text-sm lg:text-lg font-bold">
                          {product.price} LKR
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {renderType === "home" && (
            <div className="flex-center -mt-10">
              <Button asChild>
                <Link href="/products">View All</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
