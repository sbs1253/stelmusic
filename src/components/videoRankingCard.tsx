import Image from 'next/image';
import Link from 'next/link';

export default function VideoRankingCard({ video, index, selectedTag, toggleMusic, selectedMusic }) {
  const tag = {
    views: <span>{video.viewCount}회</span>,
    likes: <span>{video.likeCount}회</span>,
    date: <span>{video.snippet.publishedAt}</span>,
  };
  return (
    <div
      className={`relative flex items-center gap-2 p-4 w-full h-14 ${
        selectedMusic.has(video.id) ? 'bg-brand-secondary/70 hover:bg-brand-secondary/80' : 'hover:bg-gray-100'
      }`}
      onClick={() => toggleMusic(video.id)}
    >
      <p className={`w-5 mr-2 text-center font-bold ${index < 3 ? 'text-brand-primary' : 'text-brand-secondary'}`}>
        {index + 1}
      </p>
      {/* <Image
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        width={48}
        height={40}
        className="w-12 rounded-lg object-contain"
        style={{ width: '48px', height: 'auto' }}
      /> */}
      {/* <Image src="/images/1.jpg" alt="1" width={300} height={200} /> */}
      <div className="w-12 h-10 bg-blue-gray-300"></div>
      <div>
        <Link href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" className="text-sm line-clamp-1">
          {video.snippet.title}
        </Link>
        <p className={`text-xs ${selectedMusic.has(video.id) ? 'text-black' : 'text-gray-500'}`}>
          {video.snippet.videoOwnerChannelTitle}
        </p>
      </div>
      <div
        className={`absolute bottom-1 right-1 flex gap-1 text-xs ${
          selectedMusic.has(video.id) ? 'text-black' : 'text-gray-500'
        }`}
      >
        {/* <span className="text-xs text-gray-500">구독</span> */}
        {tag[selectedTag]}
      </div>
    </div>
  );
}
