import React, { Component } from 'react';
import { Image, Container, Card, Grid, Button } from 'semantic-ui-react';
import Marriage from '../../components/Marriage';
import Layout from '../../components/Layout';
import PicaCard from '../../components/PicaCard';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
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

    const picaName = "Pica";
    const picaAge = 1;
    const picaHabbit = "Eat and discover gems";
    const partner1 = "Mark";
    const partner2 = "Jessica";

    return (
      <Layout>
          <PicaCard 
            picaName = { picaName }
            picaAge = { picaAge }
            picaHabbit = { picaHabbit }
            partner1 = { partner1 }
            partner2 = { partner2 }
          />
      </Layout>
    );
  }
}

export default CampaignShow;
