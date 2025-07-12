// components/control-panel/CategoryBlock.tsx
// Make sure your type definitions in '@/types/menu' are consistent with MenuValues.
// For simplicity, I'm assuming MenuValues is equivalent to MenuFormValues from our MenuPage.
import React from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form'; // Import Controller
import { Trash } from 'lucide-react';

// Re-using the types from MenuPage's context for consistency
// If you have a separate types file (e.g., types/menu.ts), use that.
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

interface MenuFormValues { // Assuming MenuValues from your zodSchema is similar to this
  menu: MenuItem[];
}

interface CategoryBlockProps {
  catIndex: number;
  removeCategory: (index: number) => void;
  categoryLength: number; // Prop to determine if remove button should be shown
  setEditing: (info: { catIndex: number; prodIndex: number }) => void; // Passed from parent
}

export default function CategoryBlock({
  catIndex,
  removeCategory,
  categoryLength,
  setEditing, // Destructure setEditing
}: CategoryBlockProps) {
  // Use useFormContext to get control, register, and formState from the parent FormProvider
  const { control, register, formState: { errors } } = useFormContext<MenuFormValues>();

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: `menu.${catIndex}.products`,
    keyName: 'formId', // Always good practice for stable keys
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 relative transform transition-all hover:scale-[1.005]">
      {categoryLength > 1 && ( // Conditionally show remove button based on categoryLength
        <button
          type="button"
          onClick={() => removeCategory(catIndex)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
          title="Remove this category"
        >
          &times;
        </button>
      )}
      <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-3 flex items-center gap-2">
        Category #{catIndex + 1}
      </h2>

      <div className="mb-6">
        <label
          htmlFor={`menu.${catIndex}.category`}
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Category Name
        </label>
        <input
          placeholder="Category Name"
          id={`menu.${catIndex}.category`}
          {...register(`menu.${catIndex}.category`, { required: 'Category name is required' })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
        {errors.menu?.[catIndex]?.category && (
          <p className="mt-2 text-sm text-red-600 font-medium">
            {errors.menu[catIndex]?.category?.message}
          </p>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-700 mb-5 border-b pb-2">Products</h3>
      <div className="space-y-6">
        {productFields.map((product, prodIndex) => (
          <div key={product._id || product.formId} className="bg-gray-50 p-6 rounded-md border border-gray-200 shadow-sm relative transition-all hover:bg-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Product #{prodIndex + 1}
            </h4>
            {productFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeProduct(prodIndex)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full w-7 h-7 flex items-center justify-center"
                title="Remove this product"
              >
                <Trash className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor={`menu.${catIndex}.products.${prodIndex}.name`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  placeholder="Name"
                  id={`menu.${catIndex}.products.${prodIndex}.name`}
                  {...register(`menu.${catIndex}.products.${prodIndex}.name`, { required: 'Product name is required' })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.menu?.[catIndex]?.products?.[prodIndex]?.name && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.menu[catIndex]?.products?.[prodIndex]?.name?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`menu.${catIndex}.products.${prodIndex}.price`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  id={`menu.${catIndex}.products.${prodIndex}.price`}
                  {...register(`menu.${catIndex}.products.${prodIndex}.price`, {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Price cannot be negative' },
                  })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.menu?.[catIndex]?.products?.[prodIndex]?.price && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {errors.menu[catIndex]?.products?.[prodIndex]?.price?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor={`menu.${catIndex}.products.${prodIndex}.description`}
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </label>
              <textarea
                placeholder="Description"
                id={`menu.${catIndex}.products.${prodIndex}.description`}
                {...register(`menu.${catIndex}.products.${prodIndex}.description`)}
                rows={2}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            {/* Checkbox for isAvailable */}
            <div className="flex items-center">
              <Controller
                name={`menu.${catIndex}.products.${prodIndex}.isAvailable`}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    id={`menu.${catIndex}.products.${prodIndex}.isAvailable`}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                )}
              />
              <label
                htmlFor={`menu.${catIndex}.products.${prodIndex}.isAvailable`}
                className="ml-2 block text-base font-medium text-gray-700"
              >
                Is Available
              </label>
            </div>

            {/* Your conditional Edit button */}
            {product._id && (
              <button
                type="button"
                onClick={() => setEditing({ catIndex, prodIndex })}
                className="text-blue-500 underline mt-2" // Added margin-top for spacing
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          appendProduct({
            name: "",
            price: 0,
            description: "",
            isAvailable: true,
          })
        }
        className="px-5 py-2 mt-4 text-sm font-medium text-white bg-green-600 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
      >
        + Add Product
      </button>
    </div>
  );
}