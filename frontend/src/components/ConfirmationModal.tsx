import { VStack, Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Link } from '@chakra-ui/react';
import { CubeTransparentIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { Step, Steps } from 'chakra-ui-steps';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { primaryColor, themeColor } from '../theme';

const steps = [
  { label: 'Transfer', icon: CubeTransparentIcon },
  { label: 'Confirmation', icon: CheckCircleIcon },
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

  const contents = [
    <VStack key={1} mt={6}>
      <Text key={0} fontSize="xl">Staring transfer...</Text>
    </VStack>,
    <VStack key={1} mt={6}>
      <Text fontSize="xl">View transaction on Etherscan:</Text>
      <Link color={primaryColor} href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 4)} <ExternalLinkIcon mx='2px' />
      </Link>
    </VStack>,
    <VStack key={2} mt={6}>
      <Text fontSize="xl">View transaction on Etherscan:</Text>
      <Link color={primaryColor} href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 4)} <ExternalLinkIcon mx='2px' />
      </Link>
      <Text fontSize="xl">Done transfering!</Text>
    </VStack>,
  ];

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Steps colorScheme={themeColor} activeStep={activeStep}>
            {steps.map(({ label, icon }) => (
              <Step label={label} key={label} icon={icon}></Step>
            ))}
          </Steps>
          {contents[activeStep]}
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme={themeColor} onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;