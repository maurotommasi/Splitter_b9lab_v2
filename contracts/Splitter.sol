// SPDX-License-Identifier: MIT
import "./SafeMath.sol";
import "./Stoppable.sol";

pragma solidity 0.6.10;

contract Splitter is Stoppable(true) {

    using SafeMath for uint;

    event SplitLog(address indexed sender, uint amount, address first, address second);

    event WithdrawRefundlog(address who, uint amount);

    /*

        For Xavier: (What question would a beneficiary ask of the logs?)
        
        WithdrawRefundlog should have a useless data that says to me: who sent me the amount?
        1) I can query SplitLog to know who sent me the amount. Obvously we can have duplicate but with meta data like block.number, block.timestamp I can know what's going on
        2) It should be more correct to leave WithdrawRefundlog(address who, uint amount) cause:
            A) being balances[address] like an ATM, I'm not asking to have all of my movements but only to receive the amount of my balance
            B) If I want to know every address that add some fund on my balance I can have something like this:
            SQL > Select sender, amount / 2 as amount from SplitLog where first = [myaddress] OR second = [myaddress]
        3) I think is so useless to put other data somewhere else or write something more uselessly in the blockchain net
        4) I think is useless to split SplitLog into 2 events, I will duplicate data
        
    */

    mapping(address => uint) public balances;
    
    function split(address _first, address _second) payable onlyIfRunning external returns(bool){

        require(_first != msg.sender && _second != msg.sender, "Splitter.split#001 : Sender can't be a beneficiary");
        require(_first != _second, "Splitter.split#002 : Beneficiaries can't have the same value");
        require(msg.value != uint(0), "Splitter.split#003 : Value can't be 0");

        uint unsplittableValue = msg.value.mod(uint(2)); 

        balances[_first] = balances[_first].add(msg.value.div(uint(2))); 
        balances[_second] = balances[_second].add(msg.value.div(uint(2))); 

        if(unsplittableValue != 0) balances[msg.sender] = balances[msg.sender].add(unsplittableValue);

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