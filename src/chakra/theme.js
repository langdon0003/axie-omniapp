import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const styles = {
    global: (props) => ({
        "html, body": {
            bg: mode("white", "gray.800")(props)
        }
    })
}

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
}

const theme = extendTheme({
    styles,
    config 
})

export default theme