import connectDB from "@/lib/db";
import { Concepts } from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface ConceptProps {
  params: Promise<{
    conceptId: string;
  }>;
}

export async function PATCH(req: NextRequest, { params }: ConceptProps) {
  try {
    const { conceptId } = await params;

    const { title, description, imageUrl, points } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(conceptId))
      return NextResponse.json(
        { message: "Invalid Concept ID" },
        { status: 400 }
      );

    if (!title || !description || !imageUrl || !points)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );

    await connectDB();

    const updated = await Concepts.findByIdAndUpdate(
      conceptId,
      {
        title: String(title),
        description: String(description),
        imageUrl: String(imageUrl),
        points: Array.isArray(points) ? points : [],
      },
      {
        new: true,
      }
    );

    return NextResponse.json(
      { message: "Concept updated successfully", concept: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating Concept[PATCH]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
