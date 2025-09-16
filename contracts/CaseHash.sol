// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CaseHash {
    // Mapping to connect a document's hash to a timestamp
    mapping(bytes32 => uint256) public hashToTimestamp;

    // Event to log when a new document hash is registered
    event DocumentRegistered(bytes32 indexed documentHash, uint256 timestamp);

    // Function to register a document's hash on the blockchain
    function registerHash(bytes32 _documentHash) public {
        require(hashToTimestamp[_documentHash] == 0, "Hash already registered.");
        hashToTimestamp[_documentHash] = block.timestamp;
        emit DocumentRegistered(_documentHash, block.timestamp);
    }

    // Function to verify if a document hash exists and get its timestamp
    function verifyHash(bytes32 _documentHash) public view returns (bool, uint256) {
        uint256 timestamp = hashToTimestamp[_documentHash];
        if (timestamp == 0) {
            return (false, 0);
        } else {
            return (true, timestamp);
        }
    }
}