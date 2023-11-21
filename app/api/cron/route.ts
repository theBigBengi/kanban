import { NextResponse } from "next/server";

export async function GET() {
  console.log("first");
  return NextResponse.json({ ok: true });
}
