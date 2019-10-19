pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "./Leaderboard.sol";

contract Gamble is Ownable, Leaderboard {
    uint public returnRate;

    event win(address indexed add, uint amount);
    event lost(address indexed add, uint amount);

    constructor() public Ownable() {
        returnRate = 20;
    }

    function() external payable { }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function setReturnRate(uint _returnRate) public onlyOwner {
        returnRate = _returnRate;
    }

    function wannaPlayAGame() public payable {
        uint playerMaxReward = msg.value / 10 * returnRate;
        require(address(this).balance > playerMaxReward, "I'm poor. Cannot play with you! Bye!");
        require(msg.value >= 2 ether, "I don't play with the poor! Bye!");

        if (isBankerWin()) {
            enterLeaderBoard(msg.sender, playerMaxReward);
            msg.sender.transfer(playerMaxReward);
            emit win(msg.sender, playerMaxReward);
        } else {
            emit lost(msg.sender, playerMaxReward);
        }
    }

    function isBankerWin() internal view returns(bool) {
        return (block.timestamp % 2 == 0) ? true : false;
    }

    function getETH(uint amount) public onlyOwner {
        require(address(this).balance > amount, "The contract doesn't have enough ETH.");
        msg.sender.transfer(amount);
    }
}