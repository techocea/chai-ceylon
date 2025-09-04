import connectDB from "@/lib/db";
import { Product } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface ProductProps {
  params: {
    productId: string;
  };
}

export async function PUT(req: NextRequest, { params }: ProductProps) {
  try {
    const { productId } = await params;
    const { name, price, description, imageUrl, isAvailable, categoryId } =
      await req.json();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid Product ID" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
    if (categoryId !== undefined) updateData.categoryId = categoryId;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No data provided to update" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product Updated Successfully", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Product Content[PUT]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
