'use server'

import PageTemplate from '@/components/PageTemplate'
import fetchData from '@/utils/fetchData';

const Page = async ({ params }: { params: { slug: string[] } }) => {

  const sliderData = await fetchData(`documentType=settings&fields="imageUrls":slider[].asset`);

  return (
    <PageTemplate padding={true}>
      <div className="">page</div>
    </PageTemplate>
  );
}

export default Page;