import connectDB from "@/lib/db";
import { SiteConfig } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const SiteConfigContent = await SiteConfig.find({});

    if (SiteConfigContent.length === 0)
      return NextResponse.json(
        { message: "No SiteConfig Content found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Fetched SiteConfig Content Successfully", SiteConfigContent },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in SiteConfig Content[GET]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { aboutText, workingHours, quickLinks, logoUrl, socialMediaLinks } =
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

    const SiteConfigContent = await SiteConfig.create({
      aboutText,
      workingHours,
      logoUrl,
      quickLinks: sanitizedQuickLinks,
      socialMediaLinks: sanitizedSocialMediaLinks,
    });

    SiteConfigContent.save();

    return NextResponse.json(
      {
        message: "SiteConfig Content Created Successfully",
        SiteConfigContent,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in SiteConfig Content[POST]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { aboutText, workingHours, quickLinks, logoUrl, socialMediaLinks } =
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

    const updatedSiteConfig = await SiteConfig.findOneAndUpdate(
      {},
      {
        aboutText,
        workingHours,
        logoUrl,
        quickLinks: sanitizedQuickLinks,
        socialMediaLinks: sanitizedSocialMediaLinks,
      },
      { new: true }
    );

    if (!updatedSiteConfig) {
      return NextResponse.json(
        { message: "No update content found[SiteConfig]" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "SiteConfig Content Updated Successfully",
        SiteConfigContent: updatedSiteConfig,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in updating SiteConfig Content[PATCH]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
