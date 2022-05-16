import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import App from "./App";

const theme = extendTheme({
  // styles: {
  //   global: {
  //     // styles for the `body`
  //     body: {
  //       color: "gray.400",
  //     },
  //   },
  // },

  components: {
    Text: {
      baseStyle: {
        color: "gray.700",
      },
    },
    Heading: {
      baseStyle: {
        color: "gray.700",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "gray.700",
      },
    },
    Button: {
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
