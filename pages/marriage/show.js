import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Marriage from '../../components/Marriage';
import Layout from '../../components/Layout';
import PicaCard from '../../components/PicaCard';
import { Link } from '../../routes';

class MarriageShow extends Component {
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

  makeDonation = () => {
    console.log("Make a Donation.");
  }

  cancle = () => {
    console.log("Maybe next time.");
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
          <Link route="/sendmessage">
            <a>
              <Button
                floated="right"
                content="Send Message"
                icon="add circle"
                primary
              />
            </a>
          </Link>
        </div>
        <div className="showPage-right">
          <div className="showPage-all-signed-up"> You are all signed up </div>
          <div className="showPage-you-got-pica"> You got your pica. Her name is Pica.</div>
          <div className="showPage-donation"> Feeling generous? Make a donation now to upgrade Pica. When Pica reaches higher level, she will bring you rare gemstone. </div>
          <div className="showPage-button-group"> 
            <button className="showPage-make-donation-button" onClick={ this.makeDonation }> Make a donation </button>
            <button className="showPage-maybe-next-time-button" onClick={ this.cancel }> Maybe next time </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default MarriageShow;
