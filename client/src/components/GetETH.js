import React, { Component } from "react";

export default class GetETH extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            contract: props.contract
        }
    }
    
    getETH = async() => {
        const { accounts, contract } = this.state;
        
        console.log(this.state.a);
        //await contract.methods.getETH().send({from: accounts[0]});
    };

    render() {
        return (
            <div>
                <button type="button" onClick= {this.getETH}> 拿錢囉～～🤩 </button>
            </div>
        );
    }
}