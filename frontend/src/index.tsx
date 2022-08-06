import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from 'react-moralis';
import App from './App';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import React from 'react';

const theme = extendTheme({
  components: {
    Steps,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider theme={theme} resetCSS>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);

