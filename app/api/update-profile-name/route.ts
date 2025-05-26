import { auth } from "@/auth";
import { updateUserName } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const success = await updateUserName(session.user.id, name.trim());

  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
