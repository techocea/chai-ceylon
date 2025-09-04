import connectDB from "@/lib/db";
import { Packages } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface PackageProps {
  params: {
    packageId: string;
  };
}

export async function PUT(req: NextRequest, { params }: PackageProps) {
  try {
    const { packageId } = await params;
    const { name, price, description, imageUrl, isAvailable, packageTypeId } =
      await req.json();

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        { error: "Invalid Package ID" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
    if (packageTypeId !== undefined) updateData.packageTypeId = packageTypeId;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No data provided to update" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedPackage = await Packages.findByIdAndUpdate(
      packageId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Package Updated Successfully", updatedPackage },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Package Content[PUT]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
