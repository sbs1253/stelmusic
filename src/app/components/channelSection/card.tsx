'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Card({ channelName, channelsData }) {
  return (
    <div className="flex flex-col justify-center items-center flex-shrink-0 max-w-[100px]">
      <Link href={channelsData[channelName].url} target="_blank" rel="noopener noreferrer">
        <Image
          src={channelsData[channelName].imageUrl}
          alt={channelsData[channelName].name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover"
        />
      </Link>
      <p className="text-center text-xs line-clamp-2">{channelsData[channelName].name}</p>
    </div>
  );
}
