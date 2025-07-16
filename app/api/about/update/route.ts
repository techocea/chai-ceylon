import connectDB from "@/lib/db";
import { About } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { title, imageUrl, description } = await req.json();

    if (!title || !imageUrl || !description)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    await connectDB();

    const updatedAboutUsContent = await About.findOneAndUpdate(
      {},
      {
        title,
        imageUrl,
        description,
      },
      { new: true }
    );

    if (!updatedAboutUsContent) {
      return NextResponse.json(
        { message: "About Us Content (Category) not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "About Us Content (Category) Updated Successfully",
        updatedAboutUsContent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in About Us Content[PATCH]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
