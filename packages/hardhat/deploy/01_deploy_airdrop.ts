import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers";

const deployAirdrop: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  // Get the deployed token info
  const tokenDeployment = await get("SimpleToken");
  const airdropAmount = 100; // 100 tokens per claim

  // Deploy Airdrop contract
  const airdropDeployment = await deploy("Airdrop", {
    from: deployer,
    args: [tokenDeployment.address, parseEther(airdropAmount.toString())],
    log: true,
    autoMine: true,
  });

  // Get contract instance to transfer tokens
  const tokenContract = await hre.ethers.getContractAt("SimpleToken", tokenDeployment.address);
  
  // Transfer tokens to the airdrop contract
  const transferAmount = parseEther((airdropAmount * 1000).toString()); // Fund for 1000 claims
  await tokenContract.transfer(airdropDeployment.address, transferAmount);

  console.log("----------------------------------------------------");
  console.log("Airdrop deployed to:", airdropDeployment.address);
  console.log("Transferred", transferAmount.toString(), "tokens to airdrop contract");
};

export default deployAirdrop;

deployAirdrop.tags = ["Airdrop"];
deployAirdrop.dependencies = ["SimpleToken"];  // Ensure Token is deployed first