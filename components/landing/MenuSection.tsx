import { Card, CardContent, CardTitle } from "../ui/card";

interface RenderTypeProps {
  renderType: "home" | "menu";
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
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
    <section className="wrapper lg:py-0">
      <div className="flex-center space-y-16 w-full">
        <div className="w-full space-y-24 flex flex-col items-center justify-center">
          {renderType === "home" ? (
            <div className="max-w-xl w-full">
              {(menu as MenuItem[]).slice(0, 1).map((categoryItem) => (
                <Card
                  key={categoryItem._id || categoryItem.category}
                  className="w-full border-t-[4px] border-primary hover:scale-105 transition-transform duration-300"
                >
                  <CardTitle>
                    <h3 className="text-2xl font-playfair-display font-bold text-center">
                      {categoryItem.category}
                    </h3>
                  </CardTitle>

                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {categoryItem.products.slice(0, 7).map((product) => (
                        <div
                          key={product._id || product.name}
                          className="flex items-center justify-between border-b border-gray-200 pb-2"
                        >
                          <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between w-full">
                              <h3 className="text-md font-medium">
                                {product.name}
                              </h3>
                              {product.isAvailable && (
                                <p className="text-sm font-bold">
                                  {product.price} LKR
                                </p>
                              )}
                            </div>
                            {product.description && (
                              <p className="text-sm text-gray-500 mt-2">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                {(menu as MenuItem[]).map((categoryItem) => (
                  <Card
                    key={categoryItem._id || categoryItem.category}
                    className="border-t-[4px] border-primary hover:scale-105 transition-transform duration-300"
                  >
                    <CardTitle>
                      <h3 className="text-2xl font-playfair-display font-bold text-center">
                        {categoryItem.category}
                      </h3>
                    </CardTitle>

                    <CardContent>
                      <div className="flex flex-col gap-4">
                        {categoryItem.products.map((product) => (
                          <div
                            key={product._id || product.name}
                            className="flex items-center justify-between border-b border-gray-200 pb-2"
                          >
                            <div className="flex flex-col w-full">
                              <div className="flex items-center justify-between w-full">
                                <h3 className="text-md font-medium">
                                  {product.name}
                                </h3>
                                {product.isAvailable && (
                                  <p className="text-sm font-bold">
                                    {product.price} LKR
                                  </p>
                                )}
                              </div>
                              {product.description && (
                                <p className="text-sm text-gray-500 mt-2">
                                  {product.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
