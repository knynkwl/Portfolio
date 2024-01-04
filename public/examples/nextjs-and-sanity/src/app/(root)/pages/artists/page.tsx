'use client'

import { usePathname } from 'next/navigation'
import PageTemplate from '@/components/PageTemplate'
import Link from 'next/link'

const Page = () => {
  const pathname = usePathname()

  return (
    <PageTemplate padding={true}>
      <div className="">
        ARTISTS {pathname}
        <div><Link href={'/pages/artists/artist-1'}>
          Artist 1
        </Link></div>
      </div>
    </PageTemplate>
  );
}

export default Page;