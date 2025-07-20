import connectDB from "@/lib/db";
import { MenuGalleryItem } from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface MenuGalleryProps {
  params: {
    menuGalleryId: string;
  };
}

export async function PATCH(req: NextRequest, { params }: MenuGalleryProps) {
  try {
    const { menuGalleryId } = params;

    const { imageUrl, slug } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(menuGalleryId)) {
      return NextResponse.json(
        { message: "Invalid Menu Gallery Id" },
        { status: 400 }
      );
    }

    if (!imageUrl || !slug)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );

    await connectDB();

    const updated = await MenuGalleryItem.findByIdAndUpdate(
      menuGalleryId,
      {
        imageUrl: String(imageUrl),
        slug: String(slug),
      },
      {
        new: true,
      }
    );

    if(!updated) return NextResponse.json({message:"Menu Gallery not found"},{status:404});

    return NextResponse.json(
      { message: "Menu Gallery updated successfully", menuGallery: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Menu Gallery[PATCH]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
