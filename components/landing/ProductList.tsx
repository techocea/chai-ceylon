"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Category {
    _id: string;
    name: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: string;
}

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    axios.get("/api/category"),
                    axios.get("/api/products"),
                ]);
                setCategories(categoriesRes.data.categories);
                console.log(categoriesRes.data.categories);
                setProducts(productsRes.data.products);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
    };

    const filteredProducts =
        activeCategory === "all"
            ? products
            : products.filter((product) => product.categoryId === activeCategory);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center">Our Products</h1>
            <p className="text-gray-500 text-center mb-8">
                Browse our catalog by category.
            </p>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button
                    onClick={() => handleCategoryClick("all")}
                    className={`py-2 px-6 rounded-full text-lg font-medium capitalize transition-colors duration-300 ${activeCategory === "all"
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className={`py-2 px-6 rounded-full text-sm font-medium transition-colors duration-300 ${activeCategory === category._id
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
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
                                    <p className="text-gray-600 text-sm mb-2">Rs&nbsp;{product.price}</p>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 text-xl py-12">
                            No products found in this category.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductList;
