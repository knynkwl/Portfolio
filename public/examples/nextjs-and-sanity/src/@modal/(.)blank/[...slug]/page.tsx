import Link from 'next/link';
import Head from 'next/head';
import { Modal } from './modal';
// import Navigation from '@/components/Navigation';
import ArtistsListing from '@/components/ArtistsListing';
// import { useEffect } from 'react';

export default function PageModal({
  params: { slug: slug },
}: {
  params: { slug: string[] };
}) {
  const isArtistsPath = slug[0] == 'artists';

  // useEffect(() => {
  //   document.title = slug.join(' ');
  // })

  return (
    <Modal slug={slug}>
        {isArtistsPath && (
          <>
            {slug[1] ? (
              <>
                <ArtistsListing />
              </>
            ) : (
              <>
                <h1>Artists Listing</h1>
                <Link
                  href="/pages/artists/wendy"
                  passHref
                  scroll={false}>Wendy</Link>
              </>
            )}
          </>
        )}
    </Modal>
  );
}