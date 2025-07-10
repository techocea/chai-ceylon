import connectDB from "@/lib/db";
import { ContactPage } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { address, email, phone, workingHours, location } = await req.json();

    await connectDB();

    const updatedContactPage = await ContactPage.findOneAndUpdate(
      {},
      {
        address,
        email,
        phone,
        location,
        workingHours,
      },
      { new: true }
    );

    if (!updatedContactPage)
      return NextResponse.json(
        {
          message: "No update content found[CONTACT_PAGE]",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(
      {
        message: "Contact Page Content Updated Successfully",
        updatedContactPage,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in updating Contact Page Content[PATCH]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
