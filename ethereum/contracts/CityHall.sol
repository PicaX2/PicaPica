pragma solidity ^0.4.17;

contract CityHall {
    mapping(address => bool) public people;
    Marriage[] public marriages;

    function createMarriage(address part1, address part2, uint createTime) public {
        require(!people[part1]);

        require(!people[part2]);
        Marriage newMarriage = new Marriage(part1, part2, createTime);
        people[part1] = true;
        people[part2] = true;
        marriages.push(newMarriage);
    }

    function getMarriages() public view returns (Marriage[]) {
      return marriages;
    }
}

contract Marriage {

    struct Magpie {
        int level;
        mapping(string => int) attributes;
        int imageHash;
    }

    struct Event {
        string message1;
        string message2;
        bool p1Sent;
        bool p2Sent;
    }

    address public part1;
    address public part2;
    Magpie public magpie;
    string public createdDate;
    mapping(string => int) jewelleries;
    mapping(string => Event) events;
    mapping(string => bool) eventsRecord;
    address public tmpAddress;
    mapping(string => address) charities;
    uint public marriageCreateTime;
    uint public donateSum;

    constructor(address p1, address p2, uint createTime) public {
        part1 = p1;
        part2 = p2;
        marriageCreateTime = createTime;
        donateSum = 0;

        if (createTime == 0) {
            marriageCreateTime = now;
        }
    }

    function createEventIfNecessary(string eventName) public {
        if (eventsRecord[eventName]) {
            return;
        }

        Event memory newEvent =  Event({
            message1: "",
            message2: "",
            p1Sent: false,
            p2Sent: false
        });
        events[eventName] = newEvent;
        eventsRecord[eventName] = true;
    }

    function sendMessage0(string eventName, string message, address ppl) public {
        createEventIfNecessary(eventName);

        Event storage currentEvent = events[eventName];
        if (ppl == part1) {
            currentEvent.p1Sent = true;
            currentEvent.message1 = message;
        } else {
            currentEvent.p2Sent = true;
            currentEvent.message2 = message;
        }
        if (currentEvent.p1Sent && currentEvent.p2Sent) {
            generateJewellery();
        }

    }

    function getMessage(string eventName, address ppl) public view returns (string) {
        Event storage tmpEvent = events[eventName];
        if (ppl == part1) {
            return tmpEvent.message1;
        } else {
            return tmpEvent.message2;
        }
    }

    function addCharity(string charityName, address charityWalletAddress) public payable {
        charities[charityName] = charityWalletAddress;
    }

    function getCharityAddress(string charityName) public view returns (address) {
        return charities[charityName];
    }

    function donate(string charityName, uint money) public {
        // TODO:
        charities[charityName].transfer(money);
        donateSum += money;
    }

    function getLevel() public view returns (uint) {
        uint lifetime = (now - marriageCreateTime) / 2592000;
        return (donateSum / 1000000000000000000) + lifetime;
    }

    function generateJewellery() public{
        uint level = getLevel();
        for (uint tryIndex = 0; tryIndex <= level; tryIndex++) {
            uint randomResult = random() % 100;
            if (randomResult == 99) {
                jewelleries["0"] = jewelleries["0"] + 1;
                return;
            }
        }
        jewelleries["1"] = jewelleries["1"] + 1;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, now)));
    }

    function getJewelleries(string jewelleryId) public view returns (int) {
        return jewelleries[jewelleryId];
    }
}
