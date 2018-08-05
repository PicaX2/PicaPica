import React from 'react';
import Layout from '../components/Layout';
import { Image } from 'semantic-ui-react';

export default  () => {
    return (
      <Layout>
        <Image className="demo-screenshot" src='../static/levelup.png' />
      </Layout>
    )
}
