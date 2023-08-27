import Head from 'next/head';

import Common404 from '@/components/utils/Common404';

export default function PageNotFound404() {
  return (
    <>
      <Head>
        <title>404 Page not Found</title>
      </Head>
      <Common404 message="This page could not be found." />
    </>
  );
}
