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
    const {
      aboutText,
      workingHours,
      quickLinks,
      logoUrl,
      clientLogoUrls,
      socialMediaLinks,
    } = await req.json();

    if (
      !aboutText ||
      !workingHours ||
      !quickLinks ||
      !logoUrl ||
      !clientLogoUrls ||
      !socialMediaLinks
    )
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 404 }
      );

    await connectDB();

    const sanitizedClientLogoUrls = Array.isArray(clientLogoUrls)
      ? clientLogoUrls.map((image) => ({
          name: String(image.name),
          imageUrl: String(image.imageUrl),
        }))
      : [];

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
      clientLogoUrls: sanitizedClientLogoUrls,
      quickLinks: sanitizedQuickLinks,
      socialMediaLinks: sanitizedSocialMediaLinks,
    });

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
    const {
      aboutText,
      workingHours,
      quickLinks,
      logoUrl,
      clientLogoUrls,
      socialMediaLinks,
    } = await req.json();

    await connectDB();

    const sanitizedClientLogoUrls = Array.isArray(clientLogoUrls)
      ? clientLogoUrls.map((image) => ({
          name: String(image.name),
          imageUrl: String(image.imageUrl),
        }))
      : [];

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
        clientLogoUrls: sanitizedClientLogoUrls,
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
