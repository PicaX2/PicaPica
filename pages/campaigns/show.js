import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Marriage from '../../components/Marriage';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
// import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // const campaign = Campaign(props.query.address);
    console.log(JSON.stringify(props))
    const marriageAddress = props.query.marriage;
    const marriage = Marriage(marriageAddress);
    const level = await marriage.methods.getLevel().call();
    const part1 = await marriage.methods.part1().call();
    const part2 = await marriage.methods.part2().call();
    const magpie = await marriage.methods.magpie().call();
    const marriageCreateTime = await marriage.methods.marriageCreateTime().call();
    const donateSum = await marriage.methods.donateSum().call();

    return {
      marriageAddress,
      level, 
      part1,
      part2,
      magpie,
      marriageCreateTime,
      donateSum,
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    const {
      level, 
      marriageAddress,
      part1,
      part2,
      magpie,
      marriageCreateTime,
      donateSum,
    } = this.props;

    return (
        <div>
            <h1>Marriage</h1>
            <p>Address: { marriageAddress }</p>
            <p>level: { level }</p>
            <p>part1: { part1 }</p>
            <p>part2: { part2 }</p>
            <p>marriageCreateTime: { marriageCreateTime }</p>
            <p>donateSum: { donateSum }</p>
            <p>magpie: { JSON.stringify(magpie) }</p>
        </div>
    //   <Layout>
    //     <h3>Campaign Show</h3>
    //     <Grid>
    //       <Grid.Row>
    //         {/* <Grid.Column width={10}>{this.renderCards()}</Grid.Column> */}

    //         <Grid.Column width={6}>
    //           <ContributeForm address={this.props.address} />
    //         </Grid.Column>
    //       </Grid.Row>

    //       <Grid.Row>
    //         <Grid.Column>
    //           <Link route={`/campaigns/${this.props.address}/requests`}>
    //             <a>
    //               <Button primary>View Requests</Button>
    //             </a>
    //           </Link>
    //         </Grid.Column>
    //       </Grid.Row>
    //     </Grid>
    //   </Layout>
    );
  }
}

export default CampaignShow;