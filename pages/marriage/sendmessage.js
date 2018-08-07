import React, { Component } from 'react';
import { Form, Button, Input, Message, Container, Image } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import Marriage from '../../components/Marriage';

class MarriageNew extends Component {
  state = {
    eventName: '',
    message: '',
    sendAddress: '',
    showMessage: false,
    loading: false,
    msg1:'',
    msg2:'',
  }

  static async getInitialProps(props) {
    const marriageAddress = props.query.marriage;
    const marriage = Marriage(marriageAddress);
    const part1 = await marriage.methods.part1().call();
    const part2 = await marriage.methods.part2().call();

    return {
      part1,
      part2,
    };
  }

  onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true });

      const { eventName, message, sendAddress } = this.state;
      const { part1, part2 } = this.props;

      try {
        const accounts = await web3.eth.getAccounts();
        const marriage = Marriage("0x57cc906e040e1a9aCADB89A003C634be6f2A746f");

        await marriage.methods
          .sendMessage0(eventName, message, sendAddress)
          .send({
            from: accounts[0]
          });

        const msg1 = await marriage.methods.getMessage(eventName, part1).call();
        const msg2 = await marriage.methods.getMessage(eventName, part2).call();

        console.log("--> msg1 is " + msg1);
        console.log("--> msg2 is " + msg2);

        if (!msg1.length || !msg2.length) {
          Router.pushRoute('/');
          return;
        }
        
        this.setState({
          showMessage: true,
          msg1,
          msg2,
        })
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

      this.setState({ loading: false});
  }

  renderRevealMessages = () => {
    const { msg1, msg2 } = this.state;
    const { part1, part2 } = this.props;
    return (
      <Container> 
        <div>{ part1 + " says: " + msg1 }</div>
        <div>{ part2 + " says: " + msg2 }</div>
      </Container>
    )
  }

  renderLeftPanel = () => {
    return (
      <div className="anniversary-left-panel">
        <Image className="anniversary-pica-image-l1" src='../../static/magpie_l1.svg' />
        <div className="anniversary-pica-name">Pica</div>
      </div>
    )
  }

  renderRightPanel = () => {
    return (
      <div className="anniversary-right-panel">
        <div className="anniversary-question">How did you meet your partner?</div>
        <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
          <Form.Field>
            <div className="anniversary-question-label">Write down what you feel the first time you met. Tell the story to Pica.</div>
            <Input
              className="anniversary-question-input"
              value={this.state.message}
              onChange={event =>
                this.setState({ message: event.target.value })}/>
          </Form.Field>

          <Form.Field>
            <label>Event name</label>
            <Input
              value={this.state.eventName}
              onChange={event =>
                this.setState({ eventName: event.target.value })}/>
          </Form.Field>

          <Form.Field>
            <label>Send From Address</label>
            <Input
              value={this.state.sendAddress}
              onChange={event =>
                this.setState({ sendAddress: event.target.value })}/>
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Send Message!</Button>
        </Form>
        { this.state.showMessage ? this.renderRevealMessages() : null }
      </div>
    )
  }

  render() {
    return (
      <Layout>
        { this.renderLeftPanel() }
        { this.renderRightPanel() }
      </Layout>
    );
  }
}

export default MarriageNew;
