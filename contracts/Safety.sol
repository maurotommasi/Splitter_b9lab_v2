pragma solidity 0.6.10;

contract Safety {

    bool isLocked;

    modifier ReentranceCallDetection() {
        require(!isLocked, "Safety.ReentranceCallDetection#001 : Reentrance call detected");
        isLocked = true;
        _;
        isLocked = false;
    }

    constructor () public {
        isLocked = false;
    }

}