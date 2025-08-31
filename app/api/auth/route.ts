import connectDB from "@/lib/db";
import { signToken, verifyToken } from "@/lib/jwt";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
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
    // const adminPassword = await bcrypt.hash("Shah@2400@", salt);
    // console.log(adminPassword);

    // dUnSfOrD1@#23
    const token = signToken({
      _id: admin._id,
      email: admin.email,
    });

    const response = NextResponse.json(
      { message: "Admin logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, //1 hour
    });

    return response;
  } catch (error) {
    console.error("Error in ADMIN LOGIN:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

interface DecodedToken {
  _id: string;
  email: string;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyToken(token) as DecodedToken;
    return NextResponse.json(decoded);
  } catch (error) {
    console.error("Error in verifying user: ", error);
    return NextResponse.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
}
