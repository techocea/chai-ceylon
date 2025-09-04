import connectDB from "@/lib/db";
import { Banner } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const banners = await Banner.find({});

    if (banners.length === 0) {
      return NextResponse.json(
        { message: "No banners found", banners: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Banners fetched successfully", banners },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Baner Content[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type, title, imageUrl, description } = await req.json();

    if (!type || !title || !imageUrl || !description)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    // if (!banners || !Array.isArray(banners))
    //   return NextResponse.json(
    //     { message: "Invalid Banner data" },
    //     { status: 400 }
    //   );

    await connectDB();

    // const sanitizedBanners = banners.map((item) => ({
    //   title: String(item.title),
    //   type: String(item.type),
    //   imageUrl: String(item.imageUrl),
    //   description: String(item.description),
    // }));

    const savedBanners = await Banner.create({
      type,
      title,
      description,
      imageUrl,
    });

    return NextResponse.json(
      { message: "Banner Item Created Successfully", savedBanners },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Banner Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
