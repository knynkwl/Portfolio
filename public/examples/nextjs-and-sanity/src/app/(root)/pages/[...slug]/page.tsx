'use client'

import { usePathname } from 'next/navigation'
import PageTemplate from '@/components/PageTemplate'

const Page = () => {
  const pathname = usePathname()

  return (
    <PageTemplate padding={true}>
      <div className="">{pathname}</div>
    </PageTemplate>
  );
}

export default Page;