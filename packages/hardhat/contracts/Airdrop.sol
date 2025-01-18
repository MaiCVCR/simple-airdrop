//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Airdrop {
    IERC20 public token;
    uint256 public airdropAmount;
    address public owner;
    
    // Mapping to track if address has claimed tokens
    mapping(address => bool) public hasClaimed;
    
    // Event emitted when tokens are claimed
    event TokensClaimed(address indexed claimant, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(
        address _token,
        uint256 _airdropAmount
    ) {
        token = IERC20(_token);
        airdropAmount = _airdropAmount;
        owner = msg.sender;
    }
    
    function claimTokens() external {
        require(!hasClaimed[msg.sender], "Already claimed tokens");
        require(
            token.balanceOf(address(this)) >= airdropAmount,
            "Insufficient tokens in contract"
        );
        
        hasClaimed[msg.sender] = true;
        
        require(
            token.transfer(msg.sender, airdropAmount),
            "Token transfer failed"
        );
        
        emit TokensClaimed(msg.sender, airdropAmount);
    }
    
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient tokens in contract"
        );
        require(
            token.transfer(owner, amount),
            "Token transfer failed"
        );
    }
    
    function hasAddressClaimed(address _address) external view returns (bool) {
        return hasClaimed[_address];
    }
}