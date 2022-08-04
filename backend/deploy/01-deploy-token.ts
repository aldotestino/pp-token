import { network } from 'hardhat';
import 'dotenv/config';
import { DeployFunction } from 'hardhat-deploy/dist/types';
import verify from '../utils/verify';
import { developmentChains, helperNetworkConfig, INITIAL_SUPPLY } from '../helper-hardhat-config';

const deployToken: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();


  log('🚀 Deploying PPToken...');
  const ppToken = await deploy('PPToken', {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    waitConfirmations: helperNetworkConfig[network.name].blockConfirmations || 1
  });
  log('✅ PPToken deployed!');

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(ppToken.address, [INITIAL_SUPPLY], 'contracts/PPToken.sol:PPToken');
  }
};

deployToken.tags = ['all'];
export default deployToken; 