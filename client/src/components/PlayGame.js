import React, { Component } from "react";

export default class PlayGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: props.web3,
            accounts: props.accounts,
            contract: props.contract,
            winner: "___",
        }
    }

    play = async() => {
        const { web3, accounts, contract } = this.state;
        const amount = web3.utils.toWei(this.input.value, "ether");
        
        const event = await contract.methods.wannaPlayAGame().send({from: accounts[0], value: amount});
        const eventResult = Object.keys(event.events)[0];
        const winner = eventResult === "win" ? "你" : "莊家";
        this.setState({ winner });
    };

    render() {
        return (
            <div>
                <p>賭注多少 ETH（2ETH 以上 and 莊家有足夠錢😅）</p>
                <input type="text" ref={input => this.input = input}/>
                <button type="button" onClick= {this.play}> 下注 </button>
                <p>這次{this.state.winner}贏</p>
            </div>
        );
    }
}