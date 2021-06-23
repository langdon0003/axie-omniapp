import { Button, Icon, VStack } from "@chakra-ui/react"
import { MdFlipToFront } from "react-icons/md"

const NavBar = ({ tabs }) => {
    return (
        <VStack mt={2} spacing={0}>
        {
            tabs.map(tab => (
                <Button
                    as="a"
                    borderRadius={0}
                    colorScheme="black"
                    cursor="pointer"
                    fontSize="sm"
                    href={tab.url}
                    isActive={window.location.pathname === tab.url}
                    isFullWidth
                    justifyContent="start"
                    key={tab.name}
                    leftIcon={<Icon as={MdFlipToFront} />}
                    size="lg"
                    variant="ghost"
                >
                    {tab.name}
                </Button>
            ))
        }
        </VStack>
    )
}

export default NavBar