import MenuItem from "./MenuItem.js"
import { Box, Stack } from "@chakra-ui/react"

const MenuLinks = ({ flex, isOpen }) => {
    return (
        <Box flex={flex} display={{ base: isOpen ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
            <Stack spacing={8} align="center" justify={["center", "space-between", "flex-end", "flex-end"]} direction={["column", "row", "row", "row"]} pt={[4, 4, 0, 0]}>
                <MenuItem to="/">Home</MenuItem>
            </Stack>
        </Box>
    )
}

export default MenuLinks