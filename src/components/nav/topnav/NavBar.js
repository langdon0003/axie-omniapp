import { useState } from "react"
import NavBarContainer from "./NavBarContainer.js"
import Logo from "../Logo.js"
import MenuToggle from "./MenuToggle.js"
import MenuLinks from "./MenuLinks.js"

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <NavBarContainer {...props}>
            <Logo flex="1" color="white" />
            <MenuToggle flex="6" toggle={toggle} isOpen={isOpen} />
            <MenuLinks flex="6" isOpen={isOpen} />
        </NavBarContainer>
    )
}

export default NavBar