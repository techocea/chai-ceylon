import connectDB from "@/lib/db";
import { Banner } from "@/lib/models/index";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

interface BannerProps {
  params: {
    bannerId: string;
  };
}

export async function PATCH(req: Request, { params }: BannerProps) {
  try {
    const { bannerId } = params;

    const { type, title, description, imageUrl } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(bannerId)) {
      return NextResponse.json(
        { message: "Invalid Banner ID" },
        { status: 400 }
      );
    }

    if (!type || !title || !description || !imageUrl) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await Banner.findByIdAndUpdate(
      bannerId,
      {
        title: String(title),
        description: String(description),
        type: String(type),
        imageUrl: String(imageUrl),
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Banner updated", banner: updated });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
