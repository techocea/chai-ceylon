import MenuSlider from "./MenuSlider";

interface RenderTypeProps {
  renderType: "home" | "menu";
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}

interface MenuItem {
  _id: string;
  category: string;
  products: Product[];
}

const MenuSection = async ({ renderType }: RenderTypeProps) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/menu`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load products!
      </div>
    );
  }

  const { menu = [] } = await res.json();

  return (
    <section className="wrapper px-10 lg:py-0">
      <div className="w-full">
        {renderType === "home" ? (
          <div className="w-full">
            {(menu as MenuItem[]).slice(0, 1).map((categoryItem) => (
              <div
                key={categoryItem._id || categoryItem.category}
                className="w-full"
              >
                <MenuSlider products={categoryItem.products.slice(0, 7)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            {(menu as MenuItem[]).map((categoryItem) => (
              <div
                key={categoryItem._id || categoryItem.category}
                className="w-full"
              >
                <h3 className="text-2xl font-playfair-display font-bold text-center mb-6">
                  {categoryItem.category}
                </h3>
                <MenuSlider products={categoryItem.products} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
