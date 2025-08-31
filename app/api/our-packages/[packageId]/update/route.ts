import connectDB from "@/lib/db";
import { Packages } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface MenuItemProps {
  params: {
    packageId: string;
  };
}

export async function PUT(req: NextRequest, { params }: MenuItemProps) {
  try {
    const { packageId } = await params;
    const { packageType, products } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        { error: "Invalid package ID" },
        { status: 400 }
      );
    }

    if (!packageType || !Array.isArray(products)) {
      return NextResponse.json(
        { error: "Invalid data for package item update" },
        { status: 400 }
      );
    }

    await connectDB();

    const sanitizedProducts = products.map((product: any) => ({
      name: String(product.name),
      price: Number(product.price),
      description: String(product.description),
      imageUrl: String(product.imageUrl),
      isAvailable: Boolean(product.isAvailable),
    }));

    const updatedPackageItem = await Packages.findByIdAndUpdate(
      packageId,
      {
        packageType: String(packageType),
        products: sanitizedProducts,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPackageItem) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Package Item Updated Successfully", updatedPackageItem },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in packages Content[PUT]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
