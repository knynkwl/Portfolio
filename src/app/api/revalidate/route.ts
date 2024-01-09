import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || null;
  const type: "page" | "layout" | undefined = request.nextUrl.searchParams.get('type') as "page" | "layout" | undefined || undefined;

  if(path) {
    revalidatePath(path, type);
    return NextResponse.json({ revalidated: true, now: Date.now(), path: path });
  } else {
    return NextResponse.json(
      { error: "path not supplied" },
      { status: 405 }
    );
  }
}
