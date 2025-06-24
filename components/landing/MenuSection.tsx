import Heading from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MenuEntry {
  id: number;
  label: string;
  price: number;
}

interface MenuItem {
  id: number;
  title: string;
  description: string;
  items: MenuEntry[];
}

interface MenuSectionProps {
  data: MenuItem[];
  renderType: "home" | "menu";
}

const MenuSection = ({ data, renderType }: MenuSectionProps) => (
  <section className="wrapper lg:pt-0">
    <div className="flex-center space-y-16 w-full">
      {data.map((element, idx) => {
        if (renderType === "home" && idx !== 0) return null;

        return (
          <div key={element.id} className="lg:max-w-2xl w-full space-y-6">
            {(renderType === "menu" || idx === 0) && (
              <Heading
                title={element.title}
                description={element.description}
              />
            )}

            <div className="flex flex-col gap-4">
              {element.items.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center justify-between border-b border-gray-200"
                >
                  <h3 className="text-sm lg:text-lg max-w-2xs w-full lg:max-w-xl">
                    {menu.label}
                  </h3>
                  <p className="text-sm lg:text-lg font-bold">{menu.price} LKR</p>
                </div>
              ))}
            </div>

            {renderType === "home" && (
              <div className="flex-center">
                <Button asChild>
                  <Link href="/menu">View All</Link>
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
);

export default MenuSection;
