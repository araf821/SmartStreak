import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const { name, imageUrl, profileType, grade } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.user.create({
      data: {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl,
        name,
        grade,
        profileType,
        streakUpdatedAt: "",
      },
    });

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("PROFILE CREATION ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
