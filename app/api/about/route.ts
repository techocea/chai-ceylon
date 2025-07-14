import connectDB from "@/lib/db";
import { About } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const aboutUsContent = await About.find({});

    if (!aboutUsContent)
      return NextResponse.json(
        { message: "No About us Content found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Fetched About us content successfully", aboutUsContent },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in About us Content[GET]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { page, title, imageUrl, description } = await req.json();
    await connectDB();

    if (!page || !title || !imageUrl || !description)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    const aboutUsContent = await About.create({
      page,
      title,
      imageUrl,
      description,
    });

    aboutUsContent.save();

    return NextResponse.json(
      { message: "About us content created Successfully", aboutUsContent },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in About us Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
