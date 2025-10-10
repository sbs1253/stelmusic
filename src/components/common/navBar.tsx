import { SearchInput } from '@/components/common/searchInput';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 max-w-lg mx-auto h-16 bg-white/80 backdrop-blur-md z-50">
      <div className="h-full flex items-center px-4 gap-3">
        <Link href="/">
          <Image
            src="/images/logo-main.png"
            alt="StelMusic Logo"
            width={100}
            height={64}
            priority
            className="w-24 h-16 object-contain"
          />
        </Link>
        <div className="flex-1">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
}
