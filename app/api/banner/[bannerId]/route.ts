import { z } from "zod";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Banner } from "@/lib/models/index";

const updateSchema = z.object({
  title: z.string(),
  type: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { bannerId: string } }
) {
  try {
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 422 }
      );
    }

    await connectDB();

    const updated = await Banner.findByIdAndUpdate(
      params.bannerId,
      parsed.data,
      {
        new: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Banner updated", banner: updated });
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
