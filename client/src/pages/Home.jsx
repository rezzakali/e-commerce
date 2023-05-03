import React from 'react';
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout
      title={'Home - e-shop'}
      description={'this is home page'}
      keywords={'home page,clothes, shoes, clocks, kurta pyjama, lehenga choli'}
      author={'Rezzak'}
    >
      <h1>home page</h1>
    </Layout>
  );
}

export default Home;
