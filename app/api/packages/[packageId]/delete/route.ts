import connectDB from "@/lib/db";
import { Packages } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface PackageProps {
  params: {
    packageId: string;
  };
}

export async function DELETE(req: NextRequest, { params }: PackageProps) {
  try {
    const { packageId } = await params;

    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return NextResponse.json(
        { error: "Invalid package ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedpackage = await Packages.findByIdAndDelete(packageId);

    if (!deletedpackage) {
      return NextResponse.json({ message: "ID not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "package Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in package Content[DELETE]]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
