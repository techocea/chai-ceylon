"use client";

import axios from "axios";
import { Loader2, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CreateCategoryModal, {
  CategoryData,
} from "@/components/control-panel/CreateCategoryModal";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ProductModal, {
  ProductData,
  Category,
} from "@/components/control-panel/ProductModal";

interface Product extends ProductData {
  _id: string;
}

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [catRes, prodRes] = await Promise.allSettled([
          axios.get("/api/category"),
          axios.get("/api/products"),
        ]);

        if (catRes.status === "fulfilled" && catRes.value.status === 200) {
          setCategories(catRes.value.data.categories);
        }

        if (prodRes.status === "fulfilled" && prodRes.value.status === 200) {
          setProducts(prodRes.value.data.products);
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

  const handleCreateCategory = async (data: CategoryData) => {
    try {
      const res = await axios.post("/api/category", data);
      if (res.status === 201) {
        setCategories((prev) => [...prev, res.data.category]); //  update local state
        toast.success("Category created successfully");
      }
    } catch (error) {
      console.log("Error in creating Category[CLIENT]:", error);
      toast.error("Error in creating category");
    }
  };

  const handleSubmitProduct = async (data: ProductData) => {
    setIsProductLoading(true);
    try {
      if (selectedProduct) {
        await axios.put(`/api/products/${selectedProduct._id}/update`, data);
        setProducts((prev) =>
          prev.map((prod) =>
            prod._id === selectedProduct._id ? { ...prod, ...data } : prod
          )
        );
        toast.success("Product updated successfully");
      } else {
        const res = await axios.post("/api/products", data);
        if (res.status === 201) {
          setProducts((prev) => [...prev, res.data.product]);
          toast.success("Product created successfully");
        }
      }
      setIsProductModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log("Error handling product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`/api/products/${productId}/delete`);
      toast.success("Product Deleted Successfully");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.log("Error in deleting product:", error);
      toast.error("Error in deleting product");
    }
  };

  const handleToggleAvailability = async (
    productId: string,
    isAvailable: boolean
  ) => {
    try {
      await axios.put(`/api/products/${productId}/update`, {
        isAvailable: !isAvailable,
      });
      toast.success("Availability updated");
      setProducts((prev) =>
        prev.map((pkg) =>
          pkg._id === productId ? { ...pkg, isAvailable: !isAvailable } : pkg
        )
      );
    } catch (error) {
      console.log("Error toggling availability:", error);
      toast.error("Failed to update availability");
    }
  };

  const handleOpenModal = (prod: Product) => {
    setSelectedProduct(prod);
    setIsProductModalOpen(true);
  };

  return (
    <div className="pb-20">
      <div className="flex justify-center gap-2 float-end items-center mb-16">
        <Button
          onClick={() => setIsCategoryModalOpen(true)}
          variant="outline"
          className="border-primary"
        >
          <Plus size={32} /> Create Category
        </Button>
        <Button onClick={() => setIsProductModalOpen(true)}>Add Product</Button>
      </div>

      {/* DISPLAY PRODUCTS AREA */}
      <h2 className="text-xl font-semibold mb-4">All products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-6">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-500 flex justify-center items-center">
            <Loader2 className="animate-spin mr-2" /> Loading...
          </div>
        ) : products.length === 0 ? (
          <div className="mt-16 col-span-full text-center text-gray-400">
            No products available
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col cursor-pointer"
              onClick={() => handleOpenModal(product)}
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

                <div className="mt-4 flex items-center justify-between w-full">
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      id={`show-${product._id}`}
                      checked={product.isAvailable}
                      onCheckedChange={() =>
                        handleToggleAvailability(
                          product._id,
                          product.isAvailable
                        )
                      }
                    />
                    <Label
                      htmlFor={`show-${product._id}`}
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
                      handleDeleteProduct(product._id);
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

      {isCategoryModalOpen && (
        <CreateCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onCreate={handleCreateCategory}
        />
      )}
      {isProductModalOpen && (
        <ProductModal
          isLoading={isProductLoading}
          categories={categories}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleSubmitProduct}
          initialData={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
