import { VideoLink } from '@/components/layout/videoLink';
import { PlayCircle } from '@mui/icons-material';
import Image from 'next/image';

export default function Card({ video, index }) {
  return (
    <VideoLink videoId={video.video_id}>
      <div className="flex items-center gap-4 p-2 hover:bg-brand-background rounded-lg group hover:scale-105 transition-all duration-200">
        {/* Ranking Number */}
        <span className="w-8 text-xl font-bold text-brand-primary">{String(index + 1).padStart(2, '0')}</span>

        {/* Thumbnail */}
        <div className="relative">
          <Image
            src={video.thumbnail_url}
            alt={video.title}
            width={96}
            height={96}
            className="h-24 w-24 rounded-lg object-cover"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
          <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-10 h-10 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-medium text-brand-text line-clamp-1">{video.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{video.video_owner_channel_title}</p>
        </div>
      </div>
    </VideoLink>
  );
}
