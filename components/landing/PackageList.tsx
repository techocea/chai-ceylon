"use client";

import axios from "axios";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

interface PackageType {
  _id: string;
  name: string;
}

interface Package {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  packageTypeId: string;
}

const PackageList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState<PackageType[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [activePackageType, setActivePackageType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, packagesRes] = await Promise.all([
          axios.get("/api/package-type"),
          axios.get("/api/packages"),
        ]);
        setTypes(typesRes.data.packageTypes);
        console.log(typesRes.data.packageTypes);
        setPackages(packagesRes.data.packages);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePackageTypeClick = (packageTypeId: string) => {
    setActivePackageType(packageTypeId);
  };

  const filtered =
    activePackageType === "all"
      ? packages
      : packages.filter(
        (product) => product.packageTypeId === activePackageType
      );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Our packages</h1>
      <p className="text-gray-500 text-center mb-8">
        Browse our catalog by category.
      </p>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => handlePackageTypeClick("all")}
          className={`py-2 px-6 rounded-full text-lg font-medium transition-colors duration-300 ${activePackageType === "all"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
          All
        </button>
        {types.map((type) => (
          <Button
            key={type._id}
            onClick={() => handlePackageTypeClick(type._id)}
            className={`py-2 px-6 rounded-full text-sm font-medium capitalize transition-colors duration-300 ${activePackageType === type._id
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {type.name}
          </Button>
        ))}
      </div>

      {/* packages Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-2xs"
              >
                <div className="relative w-full h-36">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[16px] text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between w-full mt-2">
                    <p className="text-gray-600 text-sm">
                      Rs&nbsp;{product.price}
                    </p>
                    <div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="border-primary">
                            Read More
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{product.name}</AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="relative w-full h-36">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">Price:</p>
                            <AlertDialogDescription>
                              Rs&nbsp;{product.price}
                            </AlertDialogDescription>
                          </div>
                          <div>
                            <p className="font-semibold">Description:</p>
                            <AlertDialogDescription>
                              {product.description}
                            </AlertDialogDescription>
                          </div>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-primary">
                              Close
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => openWhatsApp(product.name)}
                            >
                              Order Now
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl py-12">
              No packages found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PackageList;
