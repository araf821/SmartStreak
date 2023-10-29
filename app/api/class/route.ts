import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, imageUrl, grade } = await req.json();

    const newClass = await db.class.create({
      data: {
        name,
        imageUrl,
        teacherId: user.id,
        grade,
        inviteCode: nanoid(5),
      },
    });

    return NextResponse.json({ classId: newClass.id }, { status: 200 });
  } catch (error) {
    console.log("CLASS CREATION ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
