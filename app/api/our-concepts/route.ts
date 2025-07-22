import connectDB from "@/lib/db";
import { Concepts } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const concepts = await Concepts.find({});

    if (concepts.length === 0) {
      return NextResponse.json(
        { message: "No concepts found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Concepts fetched successfully", concepts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in fetching Concepts[GET]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, imageUrl, points } = await req.json();

    if (!title || !description || !imageUrl || !points || !points.length) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const concept = await Concepts.create({
      title,
      description,
      imageUrl,
      points,
    });

    concept.save();

    return NextResponse.json(
      { message: "Concept created successfully", concept },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in creating Concept[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
