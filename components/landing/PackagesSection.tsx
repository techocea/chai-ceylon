import MenuSlider from "./MenuSlider";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  isAvailable: boolean;
  imageUrl: string;
}

interface Package {
  _id: string;
  packageType: string;
  products: Product[];
}

interface PackagePageProps {
  packages: Package[];
}

const PackagesSection = ({ packages }: PackagePageProps) => {
  return (
    <div className="w-full">
      {packages.map((packageItem) => (
        <div
          key={packageItem._id || packageItem.packageType}
          className="w-full"
        >
          <h3 className="text-2xl font-playfair-display font-bold text-center mb-6">
            {packageItem.packageType}
          </h3>
          <MenuSlider products={packageItem.products} />
        </div>
      ))}
    </div>
  );
};

export default PackagesSection;
