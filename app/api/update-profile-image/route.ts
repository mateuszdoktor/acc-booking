import { auth } from "@/auth";
import { updateUserProfileImage } from "@/utils/db"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl } = await req.json();

  const success = await updateUserProfileImage(session.user.id, imageUrl);

  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
