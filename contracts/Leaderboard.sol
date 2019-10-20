pragma solidity >=0.4.21 <0.6.0;

contract Leaderboard {
    address[] private players;
    mapping (address => uint) public player_ETH;
    address public firstPlacePlayer = address(0);

    function _updateFirstPlace(address addr) private{
        // The ETH that you get needs to be greater than the first place player who is in the first time.
        if (player_ETH[addr] > player_ETH[firstPlacePlayer]) {
            firstPlacePlayer = addr;
        }
    }

    function enterLeaderBoard(address addr, uint winAmount) internal {
        if (!_isInLeaderBoard(addr)) {
            players.push(addr);
        }
        player_ETH[addr] += winAmount;
        _updateFirstPlace(addr);
    }

    function _isInLeaderBoard(address addr) private view returns(bool) {
        for (uint i = 0; i < players.length ; i++) {
            if (players[i] == addr) {
                return true;
            }
        }
        return false;
    }
}