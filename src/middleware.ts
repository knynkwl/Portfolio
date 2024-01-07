import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
 
export function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.searchParams.get('revalidate')) {
    event.waitUntil(
      fetch(`${process.env.TLD}/api/revalidate?path=${req.nextUrl.searchParams.get('revalidate')}`, {
        method: 'GET'
      })
    )
  }
 
  return NextResponse.next()
}