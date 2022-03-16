pragma solidity ^0.5.16;

contract RideShare {
    struct Ride {
        uint256 id;
        string from;
        string to;
    }

    mapping(uint256 => Ride) public rides;
    uint256 public ridesCount;

    event NewRideEvent(uint256 indexed _rideid);

    constructor() public {
        // addRide("blacksburg", "ashburn");
        // addRide("new york", "boston");
        // addRide("san fransisco", "los angeles");
    }

    function addRide(string memory _from, string memory _to) public {
        ridesCount++;
        rides[ridesCount] = Ride(ridesCount, _from, _to);

        emit NewRideEvent(ridesCount);
    }
}
