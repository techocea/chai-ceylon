import connectDB from "@/lib/db";
import { MenuItem } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const menu = await MenuItem.find({});

    if (!menu || menu.length === 0) {
      return NextResponse.json(
        { message: "No menu items found", menu: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Menu items fetched successfully", menu },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Menu Content[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { menu } = await req.json();

    if (!menu || !Array.isArray(menu)) {
      return NextResponse.json({ error: "Invalid menu data" }, { status: 400 });
    }

    await connectDB();

    const sanitizedMenu = menu.map((item) => ({
      category: String(item.category),
      products: Array.isArray(item.products)
        ? item.products.map((product: any) => ({
            name: String(product.name),
            price: Number(product.price),
            description: String(product.description || ""),
            isAvailable: Boolean(product.isAvailable),
          }))
        : [],
    }));

    const savedMenu = await MenuItem.insertMany(sanitizedMenu);

    return NextResponse.json(
      { message: "Menu Item Created Successfully", savedMenu },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Menu Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { menu } = await req.json();

    if (!menu || Array.isArray(menu))
      return NextResponse.json(
        { message: "Invalid menu data provided to update" },
        { status: 400 }
      );

    await connectDB();
    await MenuItem.deleteMany({});

    const sanitizedMenu = menu.map((item: any) => ({
      category: String(item.category),
      products: Array.isArray(item.products)
        ? item.products.map((product: any) => ({
            name: String(product.name),
            price: Number(product.price),
            description: String(product.description || ""),
            isAvailable: Boolean(product.isAvailable),
          }))
        : [],
    }));

    const updatedMenu = await MenuItem.insertMany(sanitizedMenu);

    return NextResponse.json(
      { message: "Menu updated successfully", updatedMenu },
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
