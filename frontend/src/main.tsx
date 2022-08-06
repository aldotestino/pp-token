import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from 'react-moralis';
import App from './App';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  components: {
    Steps,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MoralisProvider initializeOnMount={false}>
    <ChakraProvider theme={theme} resetCSS>
      <App />
    </ChakraProvider>
  </MoralisProvider>
);