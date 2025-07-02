const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MetaID Contract", function () {
    let MetaIDNFT;
    let metaID;
    let owner;
    let user1;
    let user2;
    let baseURI = "https://api.metaid.com/metadata/";
    let defaultImageURI = "ipfs://QmDefaultImageHash";

    beforeEach(async function () {
        // Get signers for testing
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy the contract
        MetaIDNFT = await ethers.getContractFactory("MetaIDNFT");
        metaID = await MetaIDNFT.deploy(baseURI, defaultImageURI);
        await metaID.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await metaID.owner()).to.equal(owner.address);
        });

        it("Should set the correct default image URI", async function () {
            expect(await metaID.defaultImageURI()).to.equal(defaultImageURI);
        });
    });

    describe("Minting", function () {
        it("Should mint an MetaID NFT", async function () {
            // Mint a new MetaID
            await metaID.connect(user1).mintMetaID(
                true, // ENS verified
                true, // Face verified
                false, // Twitter verified
                true, // Worldcoin verified
                "American", // Nationality
                80, // Wallet score
                60 // Farcaster score
            );

            // Check that the NFT was minted to the correct user
            const tokenId = await metaID.getUserTokenId(user1.address);
            expect(tokenId).to.equal(1);
            expect(await metaID.ownerOf(tokenId)).to.equal(user1.address);

            // Check identity details
            const identity = await metaID.getIdentity(tokenId);
            expect(identity.ensVerified).to.equal(true);
            expect(identity.faceVerified).to.equal(true);
            expect(identity.twitterVerified).to.equal(false);
            expect(identity.worldcoinVerified).to.equal(true);
            expect(identity.nationality).to.equal("American");
            expect(identity.walletScore).to.equal(80);
            expect(identity.farcasterScore).to.equal(60);
        });

        it("Should prevent a user from minting multiple MetaIDs", async function () {
            // Mint first NFT
            await metaID.connect(user1).mintMetaID(
                true, false, false, true, "Canadian", 70, 50
            );

            // Attempt to mint a second NFT for the same user
            await expect(
                metaID.connect(user1).mintMetaID(
                    true, false, false, true, "Canadian", 70, 50
                )
            ).to.be.revertedWith("MetaID: User already has an NFT");
        });

        it("Should require a non-empty nationality", async function () {
            await expect(
                metaID.connect(user1).mintMetaID(
                    true, false, false, true, "", 70, 50
                )
            ).to.be.revertedWith("MetaID: Nationality cannot be empty");
        });
    });

    describe("Identity Updates", function () {
        beforeEach(async function () {
            // Mint NFTs for testing
            await metaID.connect(user1).mintMetaID(
                true, false, false, true, "Canadian", 70, 50
            );
        });

        it("Should allow owner to update a user's identity", async function () {
            await metaID.connect(owner).updateIdentity(
                user1.address,
                false, // ENS verified
                true,  // Face verified
                true,  // Twitter verified
                true,  // Worldcoin verified
                "Brazilian", // New nationality
                85, // New wallet score
                75  // New Farcaster score
            );

            const tokenId = await metaID.getUserTokenId(user1.address);
            const identity = await metaID.getIdentity(tokenId);

            expect(identity.ensVerified).to.equal(false);
            expect(identity.faceVerified).to.equal(true);
            expect(identity.twitterVerified).to.equal(true);
            expect(identity.nationality).to.equal("Brazilian");
            expect(identity.walletScore).to.equal(85);
            expect(identity.farcasterScore).to.equal(75);
        });

        it("Should prevent non-owners from updating a user's identity", async function () {
            await expect(
                metaID.connect(user2).updateIdentity(
                    user1.address, false, true, true, true, "Mexican", 90, 80
                )
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Should allow users to update their own verification status", async function () {
            await metaID.connect(user1).updateVerificationStatus(
                false, // New ENS verified status
                true,  // New Face verified status
                true,  // New Twitter verified status
                false  // New Worldcoin verified status
            );

            const tokenId = await metaID.getUserTokenId(user1.address);
            const identity = await metaID.getIdentity(tokenId);

            expect(identity.ensVerified).to.equal(false);
            expect(identity.faceVerified).to.equal(true);
            expect(identity.twitterVerified).to.equal(true);
            expect(identity.worldcoinVerified).to.equal(false);

            // Other fields should remain unchanged
            expect(identity.nationality).to.equal("Canadian");
            expect(identity.walletScore).to.equal(70);
            expect(identity.farcasterScore).to.equal(50);
        });

        it("Should allow the owner to update a user's scores", async function () {
            await metaID.connect(owner).updateScores(
                user1.address,
                95, // New wallet score
                85  // New Farcaster score
            );

            const tokenId = await metaID.getUserTokenId(user1.address);
            const identity = await metaID.getIdentity(tokenId);

            expect(identity.walletScore).to.equal(95);
            expect(identity.farcasterScore).to.equal(85);

            // Other fields should remain unchanged
            expect(identity.ensVerified).to.equal(true);
            expect(identity.faceVerified).to.equal(false);
            expect(identity.nationality).to.equal("Canadian");
        });
    });

    describe("Governance Participation", function () {
        it("Should determine governance participation eligibility correctly", async function () {
            // Scenario 1: User with Worldcoin verification and ENS verification
            await metaID.connect(user1).mintMetaID(
                true,  // ENS verified
                false, // Face verified
                false, // Twitter verified
                true,  // Worldcoin verified
                "British", 70, 60
            );

            // Should be eligible for governance
            expect(await metaID.canParticipateInGovernance(user1.address)).to.equal(true);

            // Scenario 2: User with Worldcoin verification but no other verification
            await metaID.connect(user2).mintMetaID(
                false, // ENS verified
                false, // Face verified
                false, // Twitter verified
                true,  // Worldcoin verified
                "Australian", 65, 55
            );

            // Should not be eligible for governance
            expect(await metaID.canParticipateInGovernance(user2.address)).to.equal(false);

            // Update user2 to have Twitter verification
            await metaID.connect(user2).updateVerificationStatus(false, false, true, true);

            // Now should be eligible
            expect(await metaID.canParticipateInGovernance(user2.address)).to.equal(true);
        });

        it("Should return false for addresses without an MetaID", async function () {
            expect(await metaID.canParticipateInGovernance(user1.address)).to.equal(false);
        });
    });

    describe("URI Functions", function () {
        it("Should allow owner to update base URI", async function () {
            const newBaseURI = "https://new.metaid.com/metadata/";
            await metaID.connect(owner).setBaseURI(newBaseURI);

            // Mint an NFT and check its tokenURI
            await metaID.connect(user1).mintMetaID(
                true, false, false, true, "Dutch", 75, 65
            );

            const tokenId = await metaID.getUserTokenId(user1.address);
            expect(await metaID.tokenURI(tokenId)).to.equal(`${newBaseURI}${tokenId}`);
        });

        it("Should allow owner to update default image URI", async function () {
            const newImageURI = "ipfs://QmNewDefaultImageHash";
            await metaID.connect(owner).setDefaultImageURI(newImageURI);
            expect(await metaID.defaultImageURI()).to.equal(newImageURI);
        });

        it("Should revert when querying tokenURI for non-existent tokens", async function () {
            await expect(metaID.tokenURI(999)).to.be.revertedWith(
                "MetaID: URI query for nonexistent token"
            );
        });
    });

    describe("Error Handling", function () {
        it("Should revert when trying to update identity for a user without an NFT", async function () {
            await expect(
                metaID.connect(owner).updateIdentity(
                    user1.address, true, true, true, true, "German", 80, 70
                )
            ).to.be.revertedWith("MetaID: User does not have an NFT");
        });

        it("Should revert when trying to update verification status without an NFT", async function () {
            await expect(
                metaID.connect(user1).updateVerificationStatus(true, true, true, true)
            ).to.be.revertedWith("MetaID: User does not have an NFT");
        });

        it("Should revert when trying to update scores for a user without an NFT", async function () {
            await expect(
                metaID.connect(owner).updateScores(user1.address, 90, 80)
            ).to.be.revertedWith("MetaID: User does not have an NFT");
        });

        it("Should revert when querying non-existent identity", async function () {
            await expect(metaID.getIdentity(999)).to.be.revertedWith(
                "MetaID: Identity does not exist"
            );
        });
    });
}); 