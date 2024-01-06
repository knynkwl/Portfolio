import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || 'default-post';
  console.log("revalidate path: ",path);

  if(path) {
    revalidatePath(path, 'page');
    return NextResponse.json({ revalidated: true, now: Date.now(), path: path });
  } else {
    return NextResponse.json(
      { error: "path not supplied" },
      { status: 405 }
    );
  }
}
