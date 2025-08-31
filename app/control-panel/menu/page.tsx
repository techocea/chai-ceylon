"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import CategoryBlock from "@/components/control-panel/CategoryBlock";
import toast from "react-hot-toast";

interface Product {
  _id?: string;
  name: string;
  price?: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
}

interface MenuItem {
  _id?: string;
  category: string;
  products: Product[];
}

interface MenuFormValues {
  menu: MenuItem[];
}

const MenuPage = () => {
  const methods = useForm<MenuFormValues>({
    defaultValues: {
      menu: [
        {
          category: "",
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
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "menu",
    keyName: "formId",
  });

  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/menu");
      if (res.data && Array.isArray(res.data.menu)) {
        reset({ menu: res.data.menu });
      } else {
        reset({
          menu: [
            {
              category: "",
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
        menu: [
          {
            category: "",
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
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [reset]);

  const onSubmit = async (data: MenuFormValues) => {
    try {
      const categoriesToUpdate: MenuItem[] = [];
      const categoriesToCreate: MenuItem[] = [];

      data.menu.forEach((item) => {
        if (item._id) {
          categoriesToUpdate.push(item);
        } else {
          categoriesToCreate.push(item);
        }
      });

      const updatePromises = categoriesToUpdate.map((item) =>
        axios.put(`/api/menu/${item._id}/update`, item)
      );

      const createPromises: Promise<any>[] = [];
      if (categoriesToCreate.length > 0) {
        createPromises.push(
          axios.post("/api/menu", { menu: categoriesToCreate })
        );
      }

      await Promise.all([...updatePromises, ...createPromises]);
      await fetchMenu();

      toast.success("Menu saved successfully!");
    } catch (err) {
      console.error("Error saving menu:", err);
      toast.error("Save failed. Please check your inputs and try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[90vh] w-full flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <p>Please wait</p>
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {categoryFields.map((categoryField, catIndex) => (
          <CategoryBlock
            key={categoryField._id || categoryField.formId}
            catIndex={catIndex}
            removeCategory={removeCategory}
            categoryLength={categoryFields.length}
          />
        ))}

        <div className="flex justify-center gap-2 float-end items-center">
          <Button
            type="button"
            variant="outline"
            className="border-primary"
            onClick={() =>
              appendCategory({
                category: "",
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
            + Add Category
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

export default MenuPage;
