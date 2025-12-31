import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchYouTubeSignals } from '@/lib/youtube';
import { generateInsights } from '@/lib/insights';

const requestSchema = z.object({
  keyword: z.string().min(2).max(100),
  region: z.string().length(2),
  category: z.string().min(1),
  daysBack: z.number().min(1).max(30),
  agents: z.array(z.string()).min(1)
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = requestSchema.safeParse({
      ...payload,
      region: typeof payload.region === 'string' ? payload.region.toUpperCase() : payload.region,
      daysBack: Number(payload.daysBack)
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request payload', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const youtubeSignals = await fetchYouTubeSignals(parsed.data);
    const report = await generateInsights(parsed.data, youtubeSignals);

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unhandled error' },
      { status: 500 }
    );
  }
}
