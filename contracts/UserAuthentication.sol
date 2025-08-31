// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserAuthentication {
    struct User {
        address walletAddress;
        string username;
        uint256 registrationTimestamp;
        bool isRegistered;
    }
    
    mapping(address => User) public users;
    mapping(string => address) public usernameToAddress;
    
    event UserRegistered(address indexed userAddress, string username, uint256 timestamp);
    event UserLoggedIn(address indexed userAddress, uint256 timestamp);
    
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }
    
    function registerUser(string memory _username) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(usernameToAddress[_username] == address(0), "Username already taken");
        
        users[msg.sender] = User({
            walletAddress: msg.sender,
            username: _username,
            registrationTimestamp: block.timestamp,
            isRegistered: true
        });
        
        usernameToAddress[_username] = msg.sender;
        
        emit UserRegistered(msg.sender, _username, block.timestamp);
    }
    
    function isUserRegistered(address _userAddress) external view returns (bool) {
        return users[_userAddress].isRegistered;
    }
    
    function getUserInfo(address _userAddress) external view returns (
        string memory username,
        uint256 registrationTimestamp,
        bool isRegistered
    ) {
        User memory user = users[_userAddress];
        return (user.username, user.registrationTimestamp, user.isRegistered);
    }
    
    function login() external onlyRegisteredUser {
        emit UserLoggedIn(msg.sender, block.timestamp);
    }
    
    function isUsernameAvailable(string memory _username) external view returns (bool) {
        return usernameToAddress[_username] == address(0);
    }
}
