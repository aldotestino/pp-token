import Head from 'next/head';
import {  Container, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Header from '../components/Header';
import Balance from '../components/Balance';
import Sender from '../components/Sender';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi, contractAddresses } from '../constants';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

function Home() {

  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const ppTokenAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const secondaryColor = useColorModeValue('gray.500', 'gray.200');

  const [balance, setBalance] = useState('0');

  const { runContractFunction: getBalance } = useWeb3Contract({
    abi,
    contractAddress: ppTokenAddress,
    functionName: 'balanceOf',
    params: {
      account
    }
  });

  async function getBalanceHelper() {
    const b = ((await getBalance()) as BigNumber).toString();
    setBalance(b);
  }

  useEffect(() => {
    if(isWeb3Enabled) {
      getBalanceHelper();
    }
  }, [isWeb3Enabled, account]);

  return (
    <>
      <Head>
        <title>PP Token Manager</title>
        <meta name="description" content="Website to manage your PP Tokens" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <Container maxW="container.xl" h="100vh">
        <Header />
        {ppTokenAddress ?
          <Flex mt={10} gap={5} direction={['column', 'column', 'column', 'row']}>
            <Balance balance={balance} />
            <Sender contractAddress={ppTokenAddress} updateBalance={getBalanceHelper} />
          </Flex> :
          <Text mt={5} textAlign="center" fontWeight="semibold" fontSize="xl" color={secondaryColor}>Connect to a Wallet!</Text>
        }
      </Container>
    </>
  );
}

export default Home;
