import React from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { Trash, XIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Product {
  _id?: string;
  name: string;
  price: number;
  description?: string;
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

interface CategoryBlockProps {
  catIndex: number;
  removeCategory: (index: number) => void;
  categoryLength: number;
}

export default function CategoryBlock({
  catIndex,
  removeCategory,
}: CategoryBlockProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<MenuFormValues>();

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: `menu.${catIndex}.products`,
    keyName: "formId",
  });

  return (
    <div className="bg-gray-50 p-6 mb-8 border border-gray-200 shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between w-full items-center mb-4">
          <Label
            htmlFor={`menu.${catIndex}.category`}
            className="font-medium uppercase text-muted-foreground mb-3"
          >
            Category
          </Label>
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeCategory(catIndex)}
            size="sm"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
        <Input
          placeholder="Category Name"
          id={`menu.${catIndex}.category`}
          {...register(`menu.${catIndex}.category`, {
            required: "Category name is required",
          })}
        />
        {errors.menu?.[catIndex]?.category && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors.menu[catIndex]?.category?.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between w-full">
        <Label className="font-medium uppercase text-muted-foreground">
          products
        </Label>

        <Button
          type="button"
          onClick={() =>
            appendProduct({
              name: "",
              price: 0,
              description: "",
              isAvailable: true,
            })
          }
        >
          + Add Product
        </Button>
      </div>

      <div className="space-y-6 mt-3">
        {productFields.map((product, prodIndex) => (
          <div
            key={product._id || product.formId}
            className="bg-gray-50 p-6 border border-gray-200 shadow-sm relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label
                  htmlFor={`menu.${catIndex}.products.${prodIndex}.name`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  placeholder="Name"
                  id={`menu.${catIndex}.products.${prodIndex}.name`}
                  {...register(`menu.${catIndex}.products.${prodIndex}.name`, {
                    required: "Product name is required",
                  })}
                />
                {errors.menu?.[catIndex]?.products?.[prodIndex]?.name && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {
                      errors.menu[catIndex]?.products?.[prodIndex]?.name
                        ?.message
                    }
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor={`menu.${catIndex}.products.${prodIndex}.price`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Price (Rs)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  id={`menu.${catIndex}.products.${prodIndex}.price`}
                  {...register(`menu.${catIndex}.products.${prodIndex}.price`, {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                />
                {errors.menu?.[catIndex]?.products?.[prodIndex]?.price && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {
                      errors.menu[catIndex]?.products?.[prodIndex]?.price
                        ?.message
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <Label
                htmlFor={`menu.${catIndex}.products.${prodIndex}.description`}
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </Label>
              <Input
                placeholder="Description"
                id={`menu.${catIndex}.products.${prodIndex}.description`}
                {...register(
                  `menu.${catIndex}.products.${prodIndex}.description`
                )}
              />
            </div>

            <div className="flex justify-end w-full">
              <div className="flex items-center">
                <Controller
                  name={`menu.${catIndex}.products.${prodIndex}.isAvailable`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      id={`menu.${catIndex}.products.${prodIndex}.isAvailable`}
                      className="h-4 w-4 cursor-pointer"
                    />
                  )}
                />
                <Label
                  htmlFor={`menu.${catIndex}.products.${prodIndex}.isAvailable`}
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  Show Price
                </Label>
              </div>
              <div className="flex items-center justify-center gap-4">
                {productFields && (
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-red-500"
                    onClick={() => removeProduct(prodIndex)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                    Delete
                  </Button>
                )}
                {/* {product._id && (
                  <Button
                    type="button"
                    variant="link"
                    className="px-0"
                    onClick={() => setEditing({ catIndex, prodIndex })}
                  >
                    Edit
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
