import { VStack, Text, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Link, Heading, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { CubeTransparentIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { Step, Steps } from 'chakra-ui-steps';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useThemeColor } from '../store/themeStore';

const steps = [
  { label: 'Step 1', description: 'Transfer', icon: CubeTransparentIcon },
  { label: 'Step 2', description: 'Confirmation', icon: CheckCircleIcon },
];

interface ConfirmationModelProps {
  isOpen: boolean,
  onClose: () => void
  activeStep: number
  transactionHash: string
  resetSteps: () => void
}

function ConfirmationModal({ isOpen, onClose, activeStep, transactionHash, resetSteps }: ConfirmationModelProps) {

  function handleClose() {
    onClose();
    resetSteps();
  }

  const { themeColor, primaryColor } = useThemeColor();
  const { colorMode } = useColorMode();
  const secondaryColor = useColorModeValue('gray.500', 'gray.200');

  const contents = [
    <VStack key={0} mt={4}>
      <Heading fontSize="2xl">Staring transaction...</Heading>
    </VStack>,
    <VStack key={1} mt={4}>
      <Heading fontSize="2xl">Transfering...</Heading>
      <Text color={secondaryColor} fontSize="xl">View transaction on Etherscan:</Text>
      <Link color={primaryColor(colorMode)} href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 6)} <ExternalLinkIcon mx='2px' />
      </Link>
    </VStack>,
    <VStack key={2} mt={4}>
      <Heading fontSize="2xl">Transaction completed!</Heading>
      <Text color={secondaryColor} fontSize="xl">View transaction on Etherscan:</Text>
      <Link color={primaryColor(colorMode)} href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 6)} <ExternalLinkIcon mx='2px' />
      </Link>
    </VStack>,
  ];

  return (
    <Modal size="lg" isOpen={isOpen} closeOnEsc={false} closeOnOverlayClick={false} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={4}>
          <Steps labelOrientation='vertical' colorScheme={themeColor} activeStep={activeStep}>
            {steps.map(({ label, description, icon }) => (
              <Step description={description} label={label} key={label} icon={icon}></Step>
            ))}
          </Steps>
          {contents[activeStep]}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button disabled={activeStep < 2} colorScheme={themeColor} onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;