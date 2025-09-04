import connectDB from "@/lib/db";
import { Product } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface ProductProps {
  params: {
    productId: string;
  };
}

export async function DELETE(req: NextRequest, { params }: ProductProps) {
  try {
    const { productId } = await params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json({ message: "ID not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Product Content[DELETE]]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
