import connectDB from "@/lib/db";
import { MenuGalleryItem } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const gallery = await MenuGalleryItem.find();

    if (!gallery) {
      return NextResponse.json(
        { message: "No gallery found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Fetched Menu Gallery successfully",
        gallery,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching menu gallery" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, slug } = await req.json();

    if (!imageUrl || !slug)
      return NextResponse.json(
        { message: "Images and slug are required" },
        { status: 400 }
      );

    await connectDB();

    const gallery = await MenuGalleryItem.create({
      imageUrl,
      slug,
    });

    gallery.save();

    return NextResponse.json(
      { message: "Menu Gallery created successfully", gallery },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Menu Gallery[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

