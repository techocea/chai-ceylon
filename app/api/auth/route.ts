import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const admin = await User.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        {
          status: 401,
        }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    // const salt = await bcrypt.genSalt(10);
    // const adminPassword = await bcrypt.hash("chaiyoShah", salt);
    // console.log(adminPassword);

    return NextResponse.json(
      { message: "Admin logged in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in ADMIN LOGIN:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
