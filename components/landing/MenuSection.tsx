import MenuGallery from "./MenuGallery";
import Heading from "@/components/common/Heading";

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
}

const MenuSection = ({ data }: MenuSectionProps) => (
  <section className="wrapper mb-16">
    <div className="flex-center space-y-16 w-full">
      {data.map((element) => (
        <div key={element.id} className="lg:max-w-2xl w-full space-y-6">
          <Heading title={element.title} description={element.description} />

          <div className="flex flex-col gap-4">
            {element.items.map((menu) => (
              <div
                key={menu.id}
                className="flex items-center justify-between border-b border-gray-200"
              >
                <h3 className="text-sm lg:text-lg max-w-xs w-full lg:max-w-xl">{menu.label}</h3>
                <p className="text-lg font-bold">{menu.price} LKR</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default MenuSection;
