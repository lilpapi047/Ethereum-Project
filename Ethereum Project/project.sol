//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CriptoGive {
    enum Role {None,Auditor, Donante, Organizacion}

    struct User{
        address wallet;
        Role role;
    }
    struct projects {
        string name;
        address owner;
        uint goal;
        string description;
        string beneficiary;
        bool isActive;
        string image;
        bool typeProject;
    }

    mapping(address => User) public users;

    function registerUser(Role _role) public {
        require(users[msg.sender].wallet == address(0), "Ya registrado");
        users[msg.sender] = User(msg.sender, _role);
    }

    function login() public view returns (Role) {
        require(users[msg.sender].role != Role.None, "No registrado");
        return users[msg.sender].role;
    }

    function getUserInfo() public view returns (address, Role) {
        require(users[msg.sender].role != Role.None, "No registrado");
        return (users[msg.sender].wallet, users[msg.sender].role);
    }
    


}   

