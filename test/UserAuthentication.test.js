const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserAuthentication", function () {
  let userAuth;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const UserAuthentication = await ethers.getContractFactory("UserAuthentication");
    userAuth = await UserAuthentication.deploy();
    await userAuth.waitForDeployment();
  });

  describe("User Registration", function () {
    it("Should register a new user successfully", async function () {
      const username = "testuser";
      
      await expect(userAuth.connect(user1).registerUser(username))
        .to.emit(userAuth, "UserRegistered")
        .withArgs(user1.address, username, await time.latest() + 1);

      expect(await userAuth.isUserRegistered(user1.address)).to.be.true;
      
      const userInfo = await userAuth.getUserInfo(user1.address);
      expect(userInfo.username).to.equal(username);
      expect(userInfo.isRegistered).to.be.true;
    });

    it("Should prevent duplicate registrations", async function () {
      const username = "testuser";
      
      await userAuth.connect(user1).registerUser(username);
      
      await expect(userAuth.connect(user1).registerUser("newusername"))
        .to.be.revertedWith("User already registered");
    });

    it("Should prevent duplicate usernames", async function () {
      const username = "testuser";
      
      await userAuth.connect(user1).registerUser(username);
      
      await expect(userAuth.connect(user2).registerUser(username))
        .to.be.revertedWith("Username already taken");
    });

    it("Should reject empty username", async function () {
      await expect(userAuth.connect(user1).registerUser(""))
        .to.be.revertedWith("Username cannot be empty");
    });
  });

  describe("Username Availability", function () {
    it("Should return true for available username", async function () {
      expect(await userAuth.isUsernameAvailable("newuser")).to.be.true;
    });

    it("Should return false for taken username", async function () {
      const username = "testuser";
      await userAuth.connect(user1).registerUser(username);
      
      expect(await userAuth.isUsernameAvailable(username)).to.be.false;
    });
  });

  describe("User Login", function () {
    beforeEach(async function () {
      await userAuth.connect(user1).registerUser("testuser");
    });

    it("Should allow registered user to login", async function () {
      await expect(userAuth.connect(user1).login())
        .to.emit(userAuth, "UserLoggedIn")
        .withArgs(user1.address, await time.latest() + 1);
    });

    it("Should prevent unregistered user from login", async function () {
      await expect(userAuth.connect(user2).login())
        .to.be.revertedWith("User not registered");
    });
  });

  describe("User Info Retrieval", function () {
    it("Should return correct user info for registered user", async function () {
      const username = "testuser";
      await userAuth.connect(user1).registerUser(username);
      
      const userInfo = await userAuth.getUserInfo(user1.address);
      expect(userInfo.username).to.equal(username);
      expect(userInfo.isRegistered).to.be.true;
      expect(userInfo.registrationTimestamp).to.be.gt(0);
    });

    it("Should return empty info for unregistered user", async function () {
      const userInfo = await userAuth.getUserInfo(user2.address);
      expect(userInfo.username).to.equal("");
      expect(userInfo.isRegistered).to.be.false;
      expect(userInfo.registrationTimestamp).to.equal(0);
    });
  });
});
