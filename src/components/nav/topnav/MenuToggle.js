import { Box, Icon } from "@chakra-ui/react"
import { MdClear, MdMenu } from "react-icons/md"
import React from "react"
 
const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {
            isOpen ? <Icon as={MdClear} /> : <Icon as={MdMenu} />
        }
        </Box>
    )
}

export default MenuToggle