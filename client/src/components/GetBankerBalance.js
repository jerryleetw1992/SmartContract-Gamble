import React, { Component } from "react";

class GetBankerBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            contract: props.contract,
            bankerBalanace: 0
        }
    }

    getBankerBalance = async() => {
        const { contract } = this.state;
        
        const bankerBalanace = await contract.methods.getBalance().call();
        this.setState({ bankerBalanace: bankerBalanace});
    };

    render() {
        return (
            <div>
                <button type="button" onClick= {this.getBankerBalance}> 查看莊家資本 </button>
                莊家資本額： {this.state.bankerBalanace}
            </div>
        );
    }
}

export default GetBankerBalance;