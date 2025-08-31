import connectDB from "@/lib/db";
import { Packages } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const packages = await Packages.find({});

    if (!packages || packages.length === 0) {
      return NextResponse.json(
        { message: "No packagess items found", packages: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "packages items fetched successfully", packages },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in packages Content[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { packages } = await req.json();

    if (!packages || !Array.isArray(packages)) {
      return NextResponse.json(
        { error: "Invalid packages data" },
        { status: 400 }
      );
    }

    await connectDB();

    const sanitizedpackages = packages.map((item) => ({
      packageType: String(item.packageType),
      products: Array.isArray(item.products)
        ? item.products.map((product: any) => ({
            name: String(product.name),
            price: Number(product.price),
            description: String(product.description || ""),
            imageUrl: String(product.imageUrl || ""),
            isAvailable: Boolean(product.isAvailable),
          }))
        : [],
    }));

    const savedpackages = await Packages.insertMany(sanitizedpackages);

    return NextResponse.json(
      { message: "packages Item Created Successfully", savedpackages },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in packages Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
