import { VideoLink } from '@/components/layout/videoLink';
import { formatDate, formatLikeCount, formatViewCount } from '@/lib/utils/formatters';
import Image from 'next/image';
import { PlayCircle } from '@mui/icons-material';

export default function Card({ video, sort = 'views' }) {
  return (
    <div className="group relative flex items-start gap-4 p-3 hover:bg-brand-background/50 rounded-lg transition-colors duration-200">
      {/* 썸네일 컨테이너 */}
      <div className="relative flex-shrink-0">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          width={120}
          height={90}
          className="h-[90px] w-[120px] rounded-lg object-cover bg-gray-100"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <PlayCircle className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <VideoLink
          videoId={video.video_id}
          className="text-sm font-medium line-clamp-2 leading-snug text-gray-900 hover:text-brand-primary transition-colors"
        >
          {video.title}
        </VideoLink>
        <p className="mt-1 text-xs text-brand-text truncate">{video.video_owner_channel_title}</p>
        <div className="flex items-center gap-2 mt-2 text-xs text-brand-text">
          {sort === 'views' && <span className="flex items-center">조회수 {formatViewCount(video.view_count)}</span>}
          {sort === 'likes' && <span className="flex items-center">좋아요 {formatLikeCount(video.like_count)}</span>}
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <time dateTime={video.published_at}>{formatDate(video.published_at.split('T')[0])}</time>
        </div>
      </div>
    </div>
  );
}
