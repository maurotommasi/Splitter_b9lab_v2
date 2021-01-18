// SPDX-License-Identifier: MIT
import "./SafeMath.sol";
import "./Stoppable.sol";

pragma solidity 0.6.10;

contract Splitter is Stoppable {

    using SafeMath for uint;

    uint maxGas;

    event SplitLog(address indexed sender, uint amount, address indexed first, address indexed second);
    event WithdrawRefundlog(address indexed who, uint amount);
    event MaxGasLog(address indexed owner, uint maxGas);

    mapping(address => uint) public balances;
    
    constructor (bool _running, uint _maxGas) Stoppable(_running) public {
        maxGas = _maxGas;
    }

    function split(address _first, address _second) payable onlyIfRunning external returns(bool){

        require(_first !=  address(0x0) && _second != address(0x0), "Splitter.split#000 : Beneficiaries can't have null address");
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

    function withdrawRefund() external returns(bool success){ 

        uint amountToRefund = balances[msg.sender];

        require(amountToRefund != uint(0), "Splitter.withdrawRefund#001 : Balance can't be equal to 0");

        emit WithdrawRefundlog(msg.sender, amountToRefund);

        balances[msg.sender] = uint(0);

        (success, ) = msg.sender.call{gas : maxGas, value : amountToRefund}("");
        require(success);
    }

    fallback() external {
        revert();
    }

    function changeMaxGas(uint _maxGas) public onlyOwner returns(bool){
        uint currectmaxGas = maxGas;
        require(currectmaxGas != _maxGas, "Can't have the same gas");
        maxGas = _maxGas;
        emit MaxGasLog(msg.sender, _maxGas);
    }

}