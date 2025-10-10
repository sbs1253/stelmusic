'use client';

import { VideoLink } from '@/components/layout/videoLink';
import Image from 'next/image';

export default function Card({ video }) {
  return (
    <div className="w-[250px] ">
      <VideoLink videoId={video.video_id}>
        <div className="space-y-2 hover:scale-105 transition-transform duration-200">
          <Image
            src={video.thumbnail_url}
            alt={video.title}
            width={250}
            height={140}
            className="h-[140px] w-full rounded-lg object-cover"
          />
          <h3 className="font-medium line-clamp-2">{video.title}</h3>
          <p className="text-sm text-gray-500">{video.video_owner_channel_title}</p>
        </div>
      </VideoLink>
    </div>
  );
}
