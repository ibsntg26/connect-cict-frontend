import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import App from "./App";

const theme = extendTheme({
  styles: {
    global: {
      "&::-webkit-scrollbar": {
        width: "8px",
        borderRadius: '8px',
      },
      "&::-webkit-scrollbar:horizontal": {
        height: "8px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: '#aaaaaa',
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: '#bebebe',
      },
    },
  },

  components: {
    Text: {
      baseStyle: {
        color: "gray.600",
      },
    },
    Heading: {
      baseStyle: {
        color: "gray.600",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "gray.700",
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          outline: "none",
          boxShadow: "none",
        }
      },
      variants: {
        solid: {
          color: "white",
          bg: "orange.400",
          _hover: {
            bg: "orange.500",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "orange.400",
        _hover: {
          color: "orange.500",
          textDecoration: "none",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
