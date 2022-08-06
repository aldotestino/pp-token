import { Flex, useColorModeValue, VStack, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useDisclosure, useColorMode } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi } from '../constants';
import { ethers } from 'ethers';
import ConfirmationModal from './ConfirmationModal';
import { useSteps } from 'chakra-ui-steps';
import { useThemeColor } from '../store/themeStore';

interface SenderProps {
  contractAddress: string,
  updateBalance: () => void
}

function Sender({ contractAddress, updateBalance }: SenderProps) {

  const { isWeb3Enabled } = useMoralis();
  const { themeColor, primaryColor } = useThemeColor();
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const [formValues, setFormValues] = useState({
    to: '',
    amount: '0.00'
  });

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  const [transactionHash, setTransactionHash] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();


  const { runContractFunction: send, isLoading, isFetching } = useWeb3Contract({
    abi,
    contractAddress,
    functionName: 'transfer',
    params: {
      to: formValues.to,
      amount: ethers.utils.parseEther(formValues.amount || '0')
    },
  });

  async function handleSend() {
    if((!ethers.utils.isAddress(formValues.to) || formValues.amount === '0.00') && isWeb3Enabled) {
      return;
    }else {
      onOpen();
      await send({
        onError: error => {
          console.log(error);
          onClose();
          reset();
        },
        onSuccess: (results: {hash: string}) => {
          setTransactionHash(results.hash);
          nextStep();
        },
        onComplete: () => {
          setFormValues({
            to: '',
            amount: '0.00'
          });
          setTimeout(() => {
            updateBalance();
            nextStep();
          }, 10*1000); // wait for update
        }
      });
    }
  }

  return (
    <Flex direction={['column', 'column', 'row']} p={10} background={bgColor} borderRadius="30" flex={6} justify={['', '', 'space-between']} align={['', '', 'center']}>
      <VStack w={['full', 'full', 'auto']}>
        <Input focusBorderColor={primaryColor(colorMode)} size="lg" w={['full', 'full', 'sm', 'md', 'lg']} value={formValues.to} onChange={e => setFormValues(prevState => ({ ...prevState, to: e.target.value }))} placeholder='Address' />
        <NumberInput
          focusBorderColor={primaryColor(colorMode)}
          onChange={val => setFormValues(prevState => ({ ...prevState, amount: val }))}
          value={formValues.amount}
          size="lg"
          w={['full', 'full', 'sm', 'md', 'lg']}
          defaultValue={0}
          min={0}
          precision={2}
          step={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </VStack>
      <Button isLoading={isLoading || isFetching} mt={[2, 2, 0]} onClick={handleSend} leftIcon={<ArrowUpIcon mr={0}/>} size="lg" colorScheme={themeColor} variant='solid'>
          Send
      </Button>
      
      <ConfirmationModal activeStep={activeStep} resetSteps={reset} transactionHash={transactionHash} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Sender;