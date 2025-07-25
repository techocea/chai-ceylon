import connectDB from "@/lib/db";
import { Events } from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface EventProps {
  params: Promise<{
    eventId: string;
  }>;
}
export async function DELETE(req: NextRequest, { params }: EventProps) {
  try {
    const { eventId } =await params;

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectDB();

    const deletedEvent = await Events.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return NextResponse.json({ message: "ID not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
