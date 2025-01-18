import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Token configuration
  const tokenName = "Test Token";
  const tokenSymbol = "TEST";
  const initialSupply = 1000000; // 1 million tokens

  // Deploy Token
  const tokenDeployment = await deploy("SimpleToken", {
    from: deployer,
    args: [tokenName, tokenSymbol, initialSupply],
    log: true,
    autoMine: true,
  });

  console.log("----------------------------------------------------");
  console.log("Token deployed to:", tokenDeployment.address);
};

export default deployToken;

deployToken.tags = ["SimpleToken"];