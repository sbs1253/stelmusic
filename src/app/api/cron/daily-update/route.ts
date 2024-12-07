import { NextResponse } from 'next/server';
import { fetchYoutubeVideos } from '@/actions/fetchYoutubePlaylist.action';

export const runtime = 'edge';

export async function GET() {
  try {
    const result = await fetchYoutubeVideos();

    return NextResponse.json({
      success: true,
      message: 'YouTube data updated successfully',
      ...result,
    });
  } catch (error) {
    console.error('Failed to update YouTube data:', error);
    return NextResponse.json(
      {
        error: 'Failed to update YouTube data',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
