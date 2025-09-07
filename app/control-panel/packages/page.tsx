"use client";

import axios from "axios";
import { Plus, Trash, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CreatePackageTypeModal, {
  PackageTypeData,
} from "@/components/control-panel/CreatePackageTypeModal";
import PackageModal, {
  PackageData,
  PackageType,
} from "@/components/control-panel/PackageModal";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Package extends PackageData {
  _id: string;
}

const Packages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPackageLoading, setIsPackageLoading] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [types, setTypes] = useState<PackageType[]>([]);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [catRes, prodRes] = await Promise.allSettled([
          axios.get("/api/package-type"),
          axios.get("/api/packages"),
        ]);

        if (catRes.status === "fulfilled" && catRes.value.status === 200) {
          setTypes(catRes.value.data.packageTypes);
        }

        if (prodRes.status === "fulfilled" && prodRes.value.status === 200) {
          setPackages(prodRes.value.data.packages);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleCreateType = async (data: PackageTypeData) => {
    try {
      const res = await axios.post("/api/package-type", data);
      if (res.status === 201) {
        setTypes((prev) => [...prev, res.data.packageType]);
        toast.success("Package Type created successfully");
        setIsTypeModalOpen(false);
      }
    } catch (error) {
      console.log("Error in creating Category[CLIENT]:", error);
      toast.error("Error in creating category");
    }
  };

  const handleSubmitPackage = async (data: PackageData) => {
    setIsPackageLoading(true);
    try {
      if (selectedPackage) {
        await axios.put(`/api/packages/${selectedPackage._id}/update`, data);
        setPackages((prev) =>
          prev.map((pkg) =>
            pkg._id === selectedPackage._id ? { ...pkg, ...data } : pkg
          )
        );
        toast.success("Package updated successfully");
      } else {
        const res = await axios.post("/api/packages", data);
        if (res.status === 201) {
          setPackages((prev) => [...prev, res.data.newPackage]);
          toast.success("Package created successfully");
        }
      }
      setIsPackageModalOpen(false);
      setSelectedPackage(null);
    } catch (error) {
      console.log("Error handling package:", error);
      toast.error("Failed to save package");
    } finally {
      setIsPackageLoading(false);
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    try {
      await axios.delete(`/api/packages/${packageId}/delete`);
      toast.success("Package Deleted Successfully");
      setPackages((prev) => prev.filter((p) => p._id !== packageId));
    } catch (error) {
      console.log("Error in deleting package:", error);
      toast.error("Error in deleting package");
    }
  };

  const handleToggleAvailability = async (
    packageId: string,
    isAvailable: boolean
  ) => {
    try {
      await axios.put(`/api/packages/${packageId}/update`, {
        isAvailable: !isAvailable,
      });
      toast.success("Availability updated");
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg._id === packageId ? { ...pkg, isAvailable: !isAvailable } : pkg
        )
      );
    } catch (error) {
      console.log("Error toggling availability:", error);
      toast.error("Failed to update availability");
    }
  };

  const handleOpenModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsPackageModalOpen(true);
  };

  return (
    <div className="pb-20">
      <div className="flex justify-end gap-2 items-center mb-10">
        <Button
          onClick={() => setIsTypeModalOpen(true)}
          variant="outline"
          className="border-primary"
        >
          <Plus size={18} className="mr-2" /> Create Category
        </Button>
        <Button
          onClick={() => {
            setIsPackageModalOpen(true);
          }}
        >
          Add Package
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-6">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-500 flex justify-center items-center">
            <Loader2 className="animate-spin mr-2" /> Loading...
          </div>
        ) : packages.length === 0 ? (
          <div className="mt-16 col-span-full text-center text-gray-400">
            No packages available
          </div>
        ) : (
          packages.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col cursor-pointer"
              onClick={() => handleOpenModal(item)}
            >
              <div className="h-32 w-full relative overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-[16px] font-semibold text-center text-gray-800">
                  {item.name}
                </h3>

                <div className="mt-4 flex items-center justify-between w-full">
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      id={`show-${item._id}`}
                      checked={item.isAvailable}
                      onCheckedChange={() =>
                        handleToggleAvailability(item._id, item.isAvailable)
                      }
                    />
                    <Label
                      htmlFor={`show-${item._id}`}
                      className="text-sm cursor-pointer"
                    >
                      Show
                    </Label>
                  </div>

                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents modal from opening
                      handleDeletePackage(item._id);
                    }}
                  >
                    <Trash className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isTypeModalOpen && (
        <CreatePackageTypeModal
          isOpen={isTypeModalOpen}
          onClose={() => setIsTypeModalOpen(false)}
          onCreate={handleCreateType}
        />
      )}
      {isPackageModalOpen && (
        <PackageModal
          isLoading={isPackageLoading}
          packageTypes={types}
          isOpen={isPackageModalOpen}
          onClose={() => {
            setIsPackageModalOpen(false);
            setSelectedPackage(null);
          }}
          onSubmit={handleSubmitPackage}
          initialData={selectedPackage}
        />
      )}
    </div>
  );
};

export default Packages;
