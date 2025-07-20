import connectDB from "@/lib/db";
import { GalleryItem } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const gallery = await GalleryItem.findOne({});
    return NextResponse.json({ imageUrls: gallery?.imageUrls || [] });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching gallery" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrls } = await req.json();

    if (!imageUrls)
      return NextResponse.json({ message: "Images Needed" }, { status: 404 });

    await connectDB();

    const gallery = await GalleryItem.create({
      imageUrls,
    });

    gallery.save();

    return NextResponse.json(
      { message: "Gallery created Successfully", gallery },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Image Gallery[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
