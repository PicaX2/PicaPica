import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const marriages = await factory.methods.getMarriages().call();
    return { marriages };
  }

  renderCampaigns() {
    const items = this.props.marriages.map(marriage => {
      return {
        header: marriage,
        description: (
          <Link route={`/campaigns/${marriage}`}>
            <a>View Campaign</a>
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
     <h3>Open Campaigns</h3>

     <Link route="/campaigns/new">
       <a>
       <Button
         floated="right"
         content="Create Marriage"
         icon="add circle"
         primary
       />
       </a>
     </Link>


    {this.renderCampaigns()}

    </div>
    </Layout>);

  }
}

export default CampaignIndex;
