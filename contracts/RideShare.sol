pragma solidity ^0.5.16;

contract RideShare {
    struct Driver {
        uint256 id;
        string name;
    }

    mapping(uint256 => Driver) public drivers;
    uint256 public driversCount;

    constructor() public {}

    function addDriver(string _name) private {
        driversCount++;
        drivers[driversCount] = Driver(driversCount, _name);
    }
}
