import { VStack, Heading, Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { primaryColor } from '../theme';

interface BalanceProps {
  balance: string
}

function Balance({ balance }: BalanceProps) {

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const secondaryColor = useColorModeValue('gray.500', 'gray.200');

  return (
    <VStack spacing={5} background={bgColor} flex={2} p={10} borderRadius={30}>
      <Heading>My Balance</Heading>
      <Flex align="baseline">
        <Heading color={primaryColor}>{ethers.utils.formatUnits(balance, 'ether')}</Heading>
        <Text ml={2} fontWeight="semibold" fontSize="xl" color={secondaryColor}>PP</Text>
      </Flex>
    </VStack>
  );
}

export default Balance;