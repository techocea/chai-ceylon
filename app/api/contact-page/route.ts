import connectDB from "@/lib/db";
import { ContactPage } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const contactPageContent = await ContactPage.find({});

    if (!contactPageContent || contactPageContent.length === 0)
      return NextResponse.json(
        { message: "Contact Page Content Not Found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: "Fetched Contact Page Content Successfully",
        contactPageContent,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in Contact Page Content[GET]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { address, email, phone, workingHours, locations } = await req.json();

    await connectDB();

    const contactPageContent = await ContactPage.create({
      address,
      email,
      phone,
      workingHours,
      locations,
    });

    return NextResponse.json(
      {
        message: "Contact Page Content Added Successfully",
        contactPageContent,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in Contact Page Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
