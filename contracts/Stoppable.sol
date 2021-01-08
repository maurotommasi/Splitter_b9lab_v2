import "./Owned.sol";

// SPDX-License-Identifier: MIT

pragma solidity 0.6.10;

contract Stoppable is Owned {

    bool internal running;
    
    event RunSwitchLog(address sender, bool switchSetting);

    modifier onlyIfRunning {
        require(running, "Stoppable.onlyIfRunning#001 : It's not running");
        _;
    }

    constructor() public {
        running = true;
    }

    function runSwitch() public onlyOwner returns(bool){
        bool actualRunning = running;
        running = !actualRunning;
        RunSwitchLog(msg.sender, !actualRunning);
        return true;
    }

}