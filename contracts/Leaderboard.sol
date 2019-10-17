pragma solidity >=0.4.21 <0.6.0;

contract Leaderboard {
    address[] private players;
    mapping (address => uint) public player_ETH;
    address public firstPlacePlayer = address(0);

    function _updateFirstPlace() private{
        for (uint i = 0; i < players.length ; i++) {
            address player = players[i];
            uint playerWinETH = player_ETH[player];
            // The ETH that you get needs to be greater than the first place player who is in the first time.
            if (playerWinETH > player_ETH[firstPlacePlayer]) {
                firstPlacePlayer = player;
            }
        }
    }

    function enterLeaderBoard(address add, uint winAmount) internal {
        if (!_isInLeaderBoard(add)) {
            players.push(add);
        }
        player_ETH[add] += winAmount;
        _updateFirstPlace();
    }

    function _isInLeaderBoard(address add) private view returns(bool) {
        for (uint i = 0; i < players.length ; i++) {
            if (players[i] == add) {
                return true;
            }
        }
        return false;
    }
}