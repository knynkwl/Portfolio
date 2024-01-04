'use client'

import { usePathname, useRouter } from 'next/navigation'
import PageTemplate from '@/components/PageTemplate'

const Page = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <PageTemplate padding={true}>
      <div className="">SINGLE ARTIST {pathname}</div>
      <button onClick={() => router.push('/pages/artists')}>
        Back to Artists
      </button>
    </PageTemplate>
  );
}

export default Page;