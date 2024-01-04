import { NextResponse, type NextRequest } from 'next/server'
import { sanityClient } from '@/utils/sanity';

export async function GET(request: NextRequest, res: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams
    const documentType = searchParams.get('documentType')
    const fields = searchParams.get('fields')

    let queryFields = 'title';
    if (fields) {
      queryFields = (fields as string).split(',').map(field => field.trim()).join(', ');
    }

    const query = `*[_type == "${documentType}"] { _id, ${queryFields} }`;
    const data = await sanityClient.fetch(query);

    return Response.json({ data })
  } catch (error: any) {
    return new Response('There was an error', {
      status: 400,
      statusText: error.message,
    })
  }
}
