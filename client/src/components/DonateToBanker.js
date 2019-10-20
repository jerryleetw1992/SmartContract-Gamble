import React, { Component } from "react";

class DonateToBanker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract
        }
    }
    
    donateToBanker = async() => {
        const { web3, accounts, contract } = this.state;
    
        const amount = web3.utils.toWei(this.input.value, 'ether');
        web3.eth.sendTransaction({
          from: accounts[0],
          to: contract._address,
          value: amount
        });
      };

    render() {
        return (
            <div>
                你要捐多少給莊家～
                <input type="text" ref={input => this.input = input} defaultValue="1"/>
                <button type="button" onClick= {this.donateToBanker}> Donate to banker </button>
            </div>
        );
    }
}

export default DonateToBanker;