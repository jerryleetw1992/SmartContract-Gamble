import React, { Component } from "react";
import SimpleStorageContract from "./contracts/Gamble.json";
import getWeb3 from "./utils/getWeb3";
//import {web3} from 'web3';

import "./App.css";

class App extends Component {
  state = { bankerBalnace: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getBankerBalance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getBankerBalance = async() => {
    const { contract } = this.state;
    
    const bankerBalnace = await contract.methods.getBalance().call();
    this.setState({ bankerBalnace: bankerBalnace});
  };

  donateToBanker = async() => {
    const { web3, accounts, contract } = this.state;

    const amount = web3.utils.toWei(this.input.value, 'ether');
    web3.eth.sendTransaction({
      from: accounts[0],
      to: contract._address,
      value: amount
    });
  };

  setReturnRate = async() => {
    const { accounts, contract } = this.state;

    await contract.methods.setReturnRate(this.returnRate.value).send({from: accounts[0]});
  };

  getReturnRate = async() => {
    const { contract } = this.state;

    const returnRate = await contract.methods.returnRate().call();
    this.setState({ returnRate: returnRate});
  };

  getETH = async() => {
    const { accounts, contract } = this.state;
    
    await contract.methods.getETH().send({from: accounts[0]});
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>有膽！來對賭啊！</h1>
        <p>
          你要捐多少給莊家～😈
          <input type="text" ref={input => this.input = input} defaultValue="1"/>
          <button type="button" onClick= {this.donateToBanker}> Donate to banker </button>
        </p>
        <p>
          <button type="button" onClick= {this.getBankerBalance}> 查看莊家資本 </button>
          莊家資本額： {this.state.bankerBalnace}
        </p>
        <p>
          <button type="button" onClick= {this.getReturnRate}> 取得現在賠率～ </button>
          現在賠率：{this.state.returnRate / 10}
        </p>
        <h2>以下為～合約擁有者 專屬互動～ 💕</h2>
        <p>
          設定賠率😎
          <input type="text" ref={input => this.returnRate = input} defaultValue="20"/>
          <button type="button" onClick= {this.setReturnRate}> Donate to banker </button>
        </p>
        <p>
        <button type="button" onClick= {this.getETH}> 拿錢囉～～🤩 </button>
        </p>
      </div>
    );
  }
}

export default App;
