import connectDB from "@/lib/db";
import { Concepts } from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface ConceptProps {
  params: Promise<{
    conceptId: string;
  }>;
}

export async function DELETE(req: NextRequest, { params }: ConceptProps) {
  try {
    const { conceptId } = await params;

    if (!conceptId)
      return NextResponse.json({ message: "Concept ID is required" });

    if (!mongoose.Types.ObjectId.isValid(conceptId))
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    await connectDB();

    const deletedConcept = await Concepts.findByIdAndDelete(conceptId);

    if (!deletedConcept)
      return NextResponse.json({ message: "ID not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Concept deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Deleting Concept[DELETE]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
