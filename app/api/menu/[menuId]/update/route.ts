import connectDB from "@/lib/db";
import { MenuItem } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface MenuItemProps {
  params: Promise<{
    menuId: string;
  }>;
}

export async function PUT(req: NextRequest, { params }: MenuItemProps) {
  try {
    const { menuId } = await params;
    const { category, products } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(menuId)) {
      return NextResponse.json(
        { error: "Invalid Menu Item ID" },
        { status: 400 }
      );
    }

    if (!category || !Array.isArray(products)) {
      return NextResponse.json(
        { error: "Invalid data for menu item update" },
        { status: 400 }
      );
    }

    await connectDB();

    const sanitizedProducts = products.map((product: any) => ({
      name: String(product.name),
      price: Number(product.price),
      description: String(product.description || ""),
      isAvailable: Boolean(product.isAvailable),
    }));

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuId,
      {
        category: String(category),
        products: sanitizedProducts,
      },
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return NextResponse.json(
        { message: "Menu Item (Category) not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Menu Item (Category) Updated Successfully", updatedMenuItem },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Menu Content[PUT]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
