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
            <div className="showPage-left">
              <PicaCard
                picaName = { picaName }
                picaAge = { picaAge }
                picaHabbit = { picaHabbit }
                partner1 = { partner1 }
                partner2 = { partner2 }
              />
            </div>
            <div className="showPage-right">
              <div className="showPage-all-signed-up"> You are all signed up </div>
              <div className="showPage-you-got-pica"> You got your pica. Her name is Pica.</div>
              <div className="showPage-donation"> Feeling generous? Make a donation now to upgrade Pica. When Pica reaches higher level, she will bring you rare gemstone. </div>
              <div className="showPage-button-group"> 
                <Button className="showPage-make-donation-button"> Make a donation </Button>
                <Button className="showPage-maybe-next-time-button"> Maybe next time </Button>
              </div>
            </div>
      </Layout>
    );
  }
}

export default CampaignShow;
