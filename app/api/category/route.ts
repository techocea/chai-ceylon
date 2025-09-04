import connectDB from "@/lib/db";
import { Category } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const categories = await Category.find();

    if (categories.length === 0)
      return NextResponse.json(
        { message: "No categories found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: "Categories fetched successfully",
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching categories[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    await connectDB();
    const category = await Category.create({
      name,
    });

    return NextResponse.json(
      { message: "Category Created Successfully", category },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating category[POST]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
