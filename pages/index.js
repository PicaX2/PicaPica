import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class MarriageIndex extends Component {
  static async getInitialProps() {
    const marriages = await factory.methods.getMarriages().call();
    return { marriages };
  }

  renderMarriage() {
    const items = this.props.marriages.map(marriage => {
      return {
        header: marriage,
        description: (
          <Link route={`/marriage/${marriage}`}>
            <a>View Marriage</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
    <Layout>
     <div>
     <h3>System Records</h3>

     <Link route="/marriage/new">
       <a>
       <Button
         floated="right"
         content="Let's marry!"
         icon="add circle"
         primary
       />
       </a>
     </Link>


    {this.renderMarriage()}

    </div>
    </Layout>);

  }
}

export default MarriageIndex;
