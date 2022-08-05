import { VStack, Text, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Link, Heading } from '@chakra-ui/react';
import { CubeTransparentIcon, CheckCircleIcon } from '@heroicons/react/outline';
import { Step, Steps } from 'chakra-ui-steps';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { primaryColor, themeColor } from '../theme';

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

  const contents = [
    <VStack key={1} mt={4}>
      <Heading key={0} fontSize="2xl">Staring transfer...</Heading>
    </VStack>,
    <VStack key={1} mt={4}>
      <Text fontSize="xl">View transaction on Etherscan:</Text>
      <Link color={primaryColor} href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 6)}...{transactionHash.slice(transactionHash.length - 4)} <ExternalLinkIcon mx='2px' />
      </Link>
    </VStack>,
    <VStack key={2} mt={4}>
      <Text fontSize="xl">View transaction on Etherscan:</Text>
      <Link color={primaryColor} href={`https://rinkeby.etherscan.io/tx/${transactionHash}`} isExternal>
        {transactionHash.slice(0, 4)}...{transactionHash.slice(transactionHash.length - 4)} <ExternalLinkIcon mx='2px' />
      </Link>
      <Text fontSize="xl">Done transfering!</Text>
    </VStack>,
  ];

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={4}>
          <Steps checkIcon={null} labelOrientation='vertical' colorScheme={themeColor} activeStep={activeStep}>
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