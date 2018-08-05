import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import Marriage from '../../components/Marriage';

class MarriageNew extends Component {
  state = {
    eventName: '',
    message: '',
    sendAddress: '',
    loading: false
  }

  onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true });

      try {
        const accounts = await web3.eth.getAccounts();
        const marriage = Marriage("0x57cc906e040e1a9aCADB89A003C634be6f2A746f");

        await marriage.methods
          .sendMessage0(this.state.eventName, this.state.message, this.state.sendAddress)
          .send({
            from: accounts[0]
          });

        Router.pushRoute('/');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

      this.setState({ loading: false});
  }

  render() {
    return (
      <Layout>
        <h1>Send a message</h1>

        <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
          <Form.Field>
            <label>Event name</label>
            <Input
              value={this.state.eventName}
              onChange={event =>
                this.setState({ eventName: event.target.value })}/>
          </Form.Field>

          <Form.Field>
            <label>Message</label>
            <Input
              value={this.state.message}
              onChange={event =>
                this.setState({ message: event.target.value })}/>
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
      </Layout>
    );
  }
}

export default MarriageNew;
