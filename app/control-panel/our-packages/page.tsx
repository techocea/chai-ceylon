"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import PackageBlock from "@/components/control-panel/PackageBlock";

interface Product {
  _id?: string;
  name: string;
  price?: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
}

interface Package {
  _id?: string;
  packageType: string;
  products: Product[];
}

interface MenuFormValues {
  packages: Package[];
}

const OurPackagesPage = () => {
  const methods = useForm<MenuFormValues>({
    defaultValues: {
      packages: [
        {
          packageType: "",
          products: [
            {
              name: "",
              price: 0,
              description: "",
              imageUrl: "",
              isAvailable: true,
            },
          ],
        },
      ],
    },
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;

  const {
    fields: packageFields,
    append: appendPackage,
    remove: removePackage,
  } = useFieldArray({
    control,
    name: "packages",
    keyName: "formId",
  });

  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/our-packages");
      if (res.data && Array.isArray(res.data.packages)) {
        reset({ packages: res.data.packages });
      } else {
        reset({
          packages: [
            {
              packageType: "",
              products: [
                {
                  name: "",
                  price: 0,
                  description: "",
                  imageUrl: "",
                  isAvailable: true,
                },
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      reset({
        packages: [
          {
            packageType: "",
            products: [
              {
                name: "",
                price: 0,
                description: "",
                imageUrl: "",
                isAvailable: true,
              },
            ],
          },
        ],
      });
      alert("Failed to load packages. Please refresh or try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [reset]);

  const onSubmit = async (data: MenuFormValues) => {
    try {
      const packagesToUpdate: Package[] = [];
      const packagesToCreate: Package[] = [];

      data.packages.forEach((item) => {
        const sanitizedProducts = item.products.map((product) => ({
          name: product.name,
          price: Number(product.price),
          description: product.description || "",
          imageUrl: product.imageUrl || "",
          isAvailable: Boolean(product.isAvailable),
        }));

        const sanitizedItem = {
          packageType: item.packageType,
          products: sanitizedProducts,
        };

        if (item._id) {
          packagesToUpdate.push({ ...sanitizedItem, _id: item._id });
        } else {
          packagesToCreate.push(sanitizedItem);
        }
      });

      const updatePromises = packagesToUpdate.map((item) =>
        axios.put(`/api/our-packages/${item._id}/update`, item)
      );

      const createPromises: Promise<any>[] = [];
      if (packagesToCreate.length > 0) {
        createPromises.push(
          axios.post("/api/our-packages", { packages: packagesToCreate })
        );
      }

      await Promise.all([...updatePromises, ...createPromises]);
      await fetchPackages();

      alert("Packag saved successfully!");
    } catch (err) {
      console.error("Error saving package:", err);
      alert("Save failed. Please check your inputs and try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {packageFields.map((packageField, packIndex) => (
          <PackageBlock
            key={packageField._id || packageField.formId}
            packIndex={packIndex}
            removePackage={removePackage}
            packageLength={packageFields.length}
          />
        ))}

        <div className="flex justify-center gap-2 float-end items-center">
          <Button
            type="button"
            variant="outline"
            className="border-primary"
            onClick={() =>
              appendPackage({
                packageType: "",
                products: [
                  {
                    name: "",
                    price: 0,
                    description: "",
                    imageUrl: "",
                    isAvailable: true,
                  },
                ],
              })
            }
          >
            + Add Package
          </Button>

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? (
              <div className="flex gap-2 items-center">
                <p>Please wait</p>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default OurPackagesPage;
