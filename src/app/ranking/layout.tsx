import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}