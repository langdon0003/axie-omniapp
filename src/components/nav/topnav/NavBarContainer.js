import { Flex } from "@chakra-ui/react"

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex align="center" justify="space-between" wrap="wrap" w="100%" bg="gray.800" color="white" {...props}>
            {children}
        </Flex>
    )
}

export default NavBarContainer