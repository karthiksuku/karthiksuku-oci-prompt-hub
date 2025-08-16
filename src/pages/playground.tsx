import React from 'react';
import Layout from '@docusaurus/Layout';
import Playground from '../playground/Playground';

export default function PlaygroundPage(){
  return (
    <Layout title="Playground">
      <div className="container">
        <Playground/>
      </div>
    </Layout>
  );
}
