// SPDX-License-Identifier: MIT
//pragma
pragma solidity ^0.8.8;
//import
import "./AggregatorV3Interface.sol";
import "./PriceConverter.sol"; 
//error
error FundMe__NotOwner();


contract FundMe {
    using PriceConverter for uint256;

    mapping(address => uint256) public s_addressToAmountFunded;
    address[] public funders;

    // Could we make this constant?  /* hint: no! We should make it immutable! */
    address public /* immutable */ i_owner;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    
    AggregatorV3Interface public priceFeed;
    
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(msg.value.getConversionRate(priceFeed) >= MINIMUM_USD, "You need to spend more ETH!");
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }
   
    
    modifier onlyOwner {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }
    
    function withdraw() payable onlyOwner public {
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        funders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }
    function cheaperWithdraw() public payable onlyowner {
        address[] memory funders = s_funders;
        for ( uint256 funderIndex = 0; 
        funderIndex < funders.length; 
        funderIndex++)
         address funder = funders [funderIndex];
         s_addressToAmountFunded[funder] = 0};
    s_funders = new address[](0);
    (bool success, ) = i_owner.call{value: address(this).balance("");
    require(success);}

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}
