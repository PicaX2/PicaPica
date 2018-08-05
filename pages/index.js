import React from 'react';
import Layout from '../components/Layout';
import { Image } from 'semantic-ui-react';
import { Link } from '../routes';

export default  () => {
    return (
      <Layout>
        <div className="welcomePage-nav-links">
            <Link route="/demo">
                <a className="homePage-demo-button" >What's Pica</a>
            </Link>
            <Link route="/demo">
                <a className="homePage-demo-button" >Demo</a>
            </Link>
            <Link route="/demo">
                <a className="homePage-demo-button" >About us</a>
            </Link>
        </div>
        <Link route="/demo">
            <Image className="demo-screenshot" src='../static/welcome-1.png' />
        </Link>
        <Link route="/levelup">
            <Image className="demo-screenshot" src='../static/welcome-2.png' />
        </Link>
        <Link route="/gem">
            <Image className="demo-screenshot" src='../static/welcome-3.png' />
        </Link>
      </Layout>
    )
}
