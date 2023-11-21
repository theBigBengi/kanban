import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await db.board.create({
    data: {
      title: "cron test",
      orgId: "sadfasdf",
      imageId: "sdfsdfsdf",
      imageThumbUrl: "sdfsdfsdf",
      imageFullUrl: "sdfsdfsdf",
      imageLinkHTML: "sdfsdfsdfsdf",
      imageUserUrl: "sdfsdfsdfsdf",
    },
  });
  return NextResponse.json({ ok: true });
}
