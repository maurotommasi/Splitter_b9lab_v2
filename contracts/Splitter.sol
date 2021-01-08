// SPDX-License-Identifier: MIT
import "./SafeMath.sol";
import "./Stoppable.sol";
import "./Safety.sol";

pragma solidity 0.6.10;

contract Splitter is Stoppable, Safety {

    using SafeMath for uint;

    event SplitLog(address indexed sender, uint amount, address first, address second);
    event WithdrawRefundlog(address who, uint amount);

    mapping(address => uint) public balances;
    
    function split(address _first, address _second) payable onlyIfRunning external returns(bool){

        require(_first != msg.sender && _second != msg.sender, "Splitter.split#001 : Sender can't be a beneficiary");
        require(_first != _second, "Splitter.split#002 : Beneficiaries can't have the same value");
        require(msg.value != uint(0), "Splitter.split#003 : Value can't be 0");

        uint unsplittableValue = msg.value.mod(uint(2)); 

        balances[_first] = balances[_first].add(msg.value.div(uint(2))); 
        balances[_second] = balances[_second].add(msg.value.div(uint(2))); 

        if(unsplittableValue != 0) balances[msg.sender].add(unsplittableValue);

        emit SplitLog(msg.sender, msg.value, _first, _second);

        return true;
    }

    function withdrawRefund() external returns(bool){ 

        uint amountToRefund = balances[msg.sender];

        require(amountToRefund != uint(0), "Splitter.withdrawRefund#001 : Balance can't be equal to 0");

        emit WithdrawRefundlog(msg.sender, amountToRefund);

        balances[msg.sender] = uint(0);

        msg.sender.transfer(amountToRefund);
        
        return true;
    }

    fallback() external {
        revert();
    }

}