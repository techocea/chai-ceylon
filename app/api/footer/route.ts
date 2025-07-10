import connectDB from "@/lib/db";
import { Footer } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const footerContent = await Footer.find({});

    if (!footerContent) {
      return NextResponse.json(
        { message: "Footer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Fetched Footer Content Successfully", footerContent },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Footer Content[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { aboutText, workingHours, quickLinks, socialMediaLinks } =
      await req.json();

    await connectDB();

    const sanitizedQuickLinks = Array.isArray(quickLinks)
      ? quickLinks.map((link) => ({
          label: String(link.label),
          href: String(link.href),
        }))
      : [];

    const sanitizedSocialMediaLinks = Array.isArray(socialMediaLinks)
      ? socialMediaLinks.map((link) => ({
          label: String(link.label),
          href: String(link.href),
        }))
      : [];

    const footerContent = await Footer.create({
      aboutText,
      workingHours,
      quickLinks: sanitizedQuickLinks,
      socialMediaLinks: sanitizedSocialMediaLinks,
    });

    footerContent.save();

    return NextResponse.json(
      {
        message: "Footer Content Created Successfully",
        footerContent,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in Footer Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
