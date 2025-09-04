import connectDB from "@/lib/db";
import { PackageType } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const packageTypes = await PackageType.find();

    if (packageTypes.length === 0)
      return NextResponse.json(
        { message: "No Package types found" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        message: "Package Types fetched successfully",
        packageTypes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in fetching Package Types[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name)
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    await connectDB();
    const packageType = await PackageType.create({
      name,
    });

    return NextResponse.json(
      { message: "Package Type Created Successfully", packageType },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in creating Package Type[POST]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
