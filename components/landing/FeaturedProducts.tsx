import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}

const FeaturedProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load products!
      </div>
    );
  }

  const { products = [] } = await res.json();
  // later implement the featured products list
  return (
    <div className="w-full lg:max-w-6xl xl:max-w-5xl mx-auto pb-24">
      <div className="w-full">
        {/* display all products based on category selection */}
        <h2 className="text-xl font-semibold mb-4">All products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-6">
          {products.length === 0 ? (
            <div className="mt-16 col-span-full text-center text-gray-400">
              No products available
            </div>
          ) : (
            products.slice(0, 4).map((product: Product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col cursor-pointer"
              >
                {/* Product Image */}
                <div className="h-32 w-full relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-[16px] font-semibold text-center text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-center text-sm text-accent">
                    {product.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
