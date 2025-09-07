import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

export interface ProductData {
  _id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: string;
  isAvailable: boolean;
}

export interface Category {
  _id: string;
  name: string;
}

interface ProductModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  categories: Category[];
  initialData?: ProductData | null;
  onSubmit: (formData: ProductData) => void;
}

const ProductModal = ({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  categories,
  initialData,
}: ProductModalProps) => {
  const [formData, setFormData] = useState<
    Omit<ProductData, "imageUrl" | "categoryId">
  >({
    name: "",
    price: 0,
    description: "",
    isAvailable: true,
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        isAvailable: initialData.isAvailable,
      });
      setImageUrl(initialData.imageUrl);
      setCategoryId(initialData.categoryId);
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        isAvailable: true,
      });
      setImageUrl("");
      setCategoryId("");
      setFile(null);
    }
  }, [initialData]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast.success("Image upload successful!");
    },
    onUploadError: () => {
      toast.error("Error occurred while uploading");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalImageUrl = imageUrl;

    if (file) {
      const res = await startUpload([file]);
      if (!res || !res[0]?.ufsUrl) {
        toast.error("Image upload failed");
        return;
      }
      finalImageUrl = res[0].url;
    }
    if (initialData && !finalImageUrl) {
      toast.error("Image is required to update.");
      return;
    }

    if (!finalImageUrl) {
      toast.error("Please provide an image.");
      return;
    }

    const finalData: ProductData = {
      ...formData,
      categoryId,
      imageUrl: finalImageUrl,
    };

    onSubmit(finalData);
  };

  if (!isOpen) return null;

  const isUpdateMode = !!initialData;

  return (
    <div className={`fixed ${isUpdateMode ? "pt-48" : "pt-0"} inset-0 bg-black/50 backdrop-opacity-50 overflow-y-auto w-full h-full z-20 flex justify-center items-center`}>
      <div className="relative left-1/6 -translate-x-1/6 p-8 border w-full max-w-lg mx-4 shadow-lg rounded-md bg-white my-8">
        <h2 className="text-xl font-semibold mb-4">
          {isUpdateMode ? "Update Product" : "Create New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CATEGORY DROPDOWN */}
          <div>
            <Label htmlFor="categoryId">Select Product Category</Label>
            <select
              name="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="border rounded w-full p-2 capitalize mt-1"
              required
            >
              <option value="" disabled>
                -- Select Product Category --
              </option>
              {Array.isArray(categories) &&
                categories.map((pack) => (
                  <option
                    key={pack._id}
                    value={pack._id}
                    className="capitalize"
                  >
                    {pack.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Product NAME */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              required
              className="mt-1"
            />
          </div>

          {/* Product PRICE & isAvailable CHECKBOX */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
                value={formData.price}
                required
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 text-primary rounded-sm border-gray-300 focus:ring-primary"
              />
              <Label htmlFor="isAvailable" className="whitespace-nowrap">
                Show
              </Label>
            </div>
          </div>

          {/* Product DESCRIPTION */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              required
              className="mt-1"
            />
          </div>

          {/* Product IMAGE UPLOAD / DISPLAY */}
          <div className="relative">
            <Label htmlFor="imageUrl">Image</Label>
            {imageUrl && !file ? (
              <div className="relative h-40 w-full mt-2 rounded-md overflow-hidden border border-gray-300">
                <Image
                  src={imageUrl}
                  alt="Product"
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <Input
                id="imageUrl"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="mt-1"
              />
            )}
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="flex gap-2 pt-4">
            <Button disabled={isLoading || isUploading} type="submit">
              {isLoading || isUploading ? (
                <Loader2 size={24} className="animate-spin transition-all" />
              ) : isUpdateMode ? (
                "Update"
              ) : (
                "Create"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="border-primary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
