import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    address1: '',
    address2: '',
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading: true });

      try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createMarriage(this.state.address1, this.state.address2, 0)
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
        <link rel="stylesheet" href="../static/picaCard.css"></link>
        <h1>Create a Marriage</h1>

        <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
          <Form.Field>
            <label>Male</label>
            <Input
              label="0x"
              labelPosition="left"
              value={this.state.address1}
              onChange={event =>
                this.setState({ address1: event.target.value })}/>
          </Form.Field>

          <Form.Field>
            <label>Female</label>
            <Input
              label="0x"
              labelPosition="left"
              value={this.state.address2}
              onChange={event =>
                this.setState({ address2: event.target.value })}/>
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Get Married!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
