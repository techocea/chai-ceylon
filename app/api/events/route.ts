import connectDB from "@/lib/db";
import { Events } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const events = await Events.find({});

    if (events.length === 0)
      return NextResponse.json({ message: "No events found" }, { status: 404 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getting events[GET]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, imageUrls, date } = await req.json();

    if (!title || !description || !imageUrls || !date) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const event = await Events.create({
      title,
      description,
      imageUrls,
      date,
    });

    event.save();

    return NextResponse.json(
      { message: "Event created successfully", event },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in creating events[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
