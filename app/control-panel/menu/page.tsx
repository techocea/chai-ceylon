// pages/admin/menu/index.tsx (or wherever your MenuPage component is)
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
// Import FormProvider to wrap your form
import { useForm, useFieldArray, FormProvider } from "react-hook-form";

// Import your CategoryBlock component
import CategoryBlock from "@/components/control-panel/CategoryBlock"; // Adjust path as needed

// Define your types. Make sure MenuValues from your zodSchema matches this structure.
// If not, adjust either this interface or your zodSchema.
export interface Product {
  _id?: string;
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
}

export interface MenuItem {
  _id?: string;
  category: string;
  products: Product[];
}

export interface MenuFormValues { // This matches what useForm expects
  menu: MenuItem[];
}

const MenuPage = () => {
  // Initialize useForm and get all methods. We'll pass `methods` to FormProvider.
  const methods = useForm<MenuFormValues>({
    defaultValues: {
      menu: [
        {
          category: "",
          products: [{ name: "", price: 0, description: "", isAvailable: true }],
        },
      ],
    },
    mode: "onBlur",
  });

  // Destructure specific methods from `methods` for local use
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = methods;

  // useFieldArray for the top-level 'menu' array (categories)
  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "menu",
    keyName: 'formId', // Crucial for stability in useFieldArray
  });

  const [loading, setLoading] = useState(true);
  const [editingInfo, setEditingInfo] = useState<{ catIndex: number; prodIndex: number } | null>(null); // State for your "Edit" functionality

  // --- Fetch Existing Menu Data ---
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ menu: MenuItem[] }>("/api/menu"); // Assuming backend returns { menu: [...] }
      if (res.data && Array.isArray(res.data.menu) && res.data.menu.length > 0) {
        reset({ menu: res.data.menu });
      } else {
        // If no data, reset to a single empty category to ensure form is always ready
        reset({
          menu: [
            { category: "", products: [{ name: "", price: 0, description: "", isAvailable: true }], },
          ],
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      // Ensure form is still usable even if fetch fails
      reset({
        menu: [
          { category: "", products: [{ name: "", price: 0, description: "", isAvailable: true }], },
        ],
      });
      alert("Failed to load menu. Please refresh or try again."); // Replace with a toast notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [reset]); // `reset` from useForm is a stable callback

  // --- Handle Form Submission ---
  const onSubmit = async (data: MenuFormValues) => {
    try {
      alert("Saving menu..."); // Replace with a toast.loading

      const categoriesToUpdate: MenuItem[] = [];
      const categoriesToCreate: MenuItem[] = [];

      data.menu.forEach(item => {
        // Prepare product data (ensure numerical prices, boolean for availability)
        const sanitizedProducts = item.products.map(product => ({
            // If you want to preserve `_id` for nested products when updating, include it here.
            // My previous backend PUT example assumed replacing the whole array,
            // so new subdocument _ids would be generated for products.
            // If your backend handles updating existing product subdocuments by _id, uncomment below:
            // _id: product._id,
            name: product.name,
            price: Number(product.price),
            description: product.description || "",
            isAvailable: Boolean(product.isAvailable),
        }));

        const sanitizedItem = {
            category: item.category,
            products: sanitizedProducts,
        };

        if (item._id) {
            // Existing category: prepare for PUT request
            categoriesToUpdate.push({ ...sanitizedItem, _id: item._id });
        } else {
            // New category: prepare for POST request
            categoriesToCreate.push(sanitizedItem);
        }
      });

      // Execute all PUT requests for updated categories
      const updatePromises = categoriesToUpdate.map(item =>
        axios.put(`/api/menu/${item._id}`, item)
      );

      // Execute POST request for all new categories (if any)
      const createPromises: Promise<any>[] = [];
      if (categoriesToCreate.length > 0) {
        createPromises.push(axios.post("/api/menu", { menu: categoriesToCreate }));
      }

      await Promise.all([...updatePromises, ...createPromises]);

      // Re-fetch the entire menu to ensure the form is synced with the latest data
      // from the database, especially important for new items that now have `_id`s.
      await fetchMenu();

      alert("Menu saved successfully!"); // Replace with toast.success
    } catch (err) {
      console.error("Error saving menu:", err);
      alert("Save failed. Please check your inputs and try again."); // Replace with toast.error
    }
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading menu...</p>
      </div>
    );
  }

  return (
    // Wrap the entire form with FormProvider
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-8 bg-gray-100 min-h-screen space-y-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
          Restaurant Menu Manager
        </h1>

        {categoryFields.map((categoryField, catIndex) => (
          <CategoryBlock
            key={categoryField._id || categoryField.formId} // Use the generated ID for the key
            catIndex={catIndex}
            removeCategory={removeCategory}
            categoryLength={categoryFields.length}
            setEditing={setEditingInfo} // Pass the setEditingInfo function down
          />
        ))}

        <div className="flex justify-between items-center mt-10 p-4 bg-white rounded-lg shadow-md">
          <button
            type="button"
            onClick={() =>
              appendCategory({
                category: "",
                products: [
                  { name: "", price: 0, description: "", isAvailable: true },
                ],
              })
            }
            className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
          >
            + Add New Menu Category Block
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !isDirty} // Disable if submitting or no changes
            className="px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-150 ease-in-out"
          >
            {isSubmitting ? "Saving Menu..." : "Save All Menu Changes"}
          </button>
        </div>
      </form>
      {/* You might render an "Edit" modal here based on editingInfo state */}
      {/* {editingInfo && (
        <EditProductModal
          catIndex={editingInfo.catIndex}
          prodIndex={editingInfo.prodIndex}
          onClose={() => setEditingInfo(null)}
          // You'd need to pass the product data, and possibly form methods to update it
        />
      )} */}
    </FormProvider>
  );
};

export default MenuPage;