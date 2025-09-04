import connectDB from "@/lib/db";
import { Packages } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const packages = await Packages.find();

    if (packages.length === 0)
      return NextResponse.json(
        { message: "No Packages found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: "Packages fetched successfully",
        packages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching Packages[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, description, imageUrl, packageTypeId } =
      await req.json();

    if (!name || !price || !description || !imageUrl || !packageTypeId)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    await connectDB();
    const newPackage = await Packages.create({
      name,
      price,
      description,
      imageUrl,
      packageTypeId,
    });

    return NextResponse.json(
      { message: "Packages Created Successfully", newPackage },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating Packages[POST]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
