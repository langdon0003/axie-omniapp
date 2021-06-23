import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import theme from "./chakra/theme.js"
import { ChakraProvider } from "@chakra-ui/react"
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider> 
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()