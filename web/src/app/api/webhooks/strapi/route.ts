// Check with Strapi
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

interface StrapiWebhookPayload {
  event: string;
  model: string;
  entry?: {
    id: number | string;
    documentId?: string;
  };
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as StrapiWebhookPayload;
  console.log(data.model);
  revalidateTag(data.model, 'max');

  return NextResponse.json({ success: true });
}
