import connectDB from "@/lib/db";
import { Events } from "@/lib/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface EventProps {
  params: Promise<{
    eventId: string;
  }>;
}

export async function PUT(req: NextRequest, { params }: EventProps) {
  try {
    const { eventId } = await params;
    const { title, description, imageUrls, date } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(eventId))
      return NextResponse.json(
        { message: "Invalid Event ID" },
        { status: 400 }
      );

    if (!title || !description || !imageUrls || !date)
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );

    await connectDB();

    const updated = await Events.findByIdAndUpdate(
      eventId,
      {
        title: String(title),
        description: String(description),
        imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
        date: new Date(date),
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!updated)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Event updated successfully", event: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating events[PUT]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
