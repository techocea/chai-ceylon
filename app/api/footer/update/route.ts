import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Footer } from "@/lib/models";

export async function PATCH(req: NextRequest) {
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

    const updatedFooter = await Footer.findOneAndUpdate(
      {},
      {
        aboutText,
        workingHours,
        quickLinks: sanitizedQuickLinks,
        socialMediaLinks: sanitizedSocialMediaLinks,
      },
      { new: true }
    );

    if (!updatedFooter) {
      return NextResponse.json(
        { message: "No update content found[FOOTER]" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Footer Content Updated Successfully",
        footerContent: updatedFooter,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in updating Footer Content[PATCH]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
