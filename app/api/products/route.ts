import connectDB from "@/lib/db";
import { Product } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const products = await Product.find();

    if (products.length === 0)
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: "products fetched successfully",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching products[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, description, imageUrl, categoryId } = await req.json();

    if (!name || !price || !description || !imageUrl || !categoryId)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    await connectDB();
    const product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      categoryId,
    });

    return NextResponse.json(
      { message: "Product Created Successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating Product[POST]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
