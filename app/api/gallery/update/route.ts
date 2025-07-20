import connectDB from "@/lib/db";
import { GalleryItem } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { imageUrls } = await req.json();

    const updatedGallery = await GalleryItem.findOneAndUpdate(
      {},
      { imageUrls },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: "Gallery updated",
      data: updatedGallery,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating gallery" },
      { status: 500 }
    );
  }
}
