import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface CategoryData {
  name: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: CategoryData) => void;
}

const CreateCategoryModal = ({
  isOpen,
  onClose,
  onCreate,
}: CategoryModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 left-124  p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2>Create New Category</h2>
        <form onSubmit={handleSubmit} className="mt-5">
          {/* CATEGORY NAME */}
          <Label htmlFor="categoryName" className="mb-2">Category Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />

          {/* CREATE ACTIONS */}
          <Button type="submit" className="mt-4 px-4 py-2">
            Create
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            type="button"
            className="ml-2 border-primary"
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
