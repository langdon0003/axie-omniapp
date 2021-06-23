import { Box, Flex } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { Redirect, Route } from "react-router"
import { getConnectedAccounts } from "../../api/web3/ethereum/index.js"
import { createNewDocument } from "../../firebase/firestore/login/index.js"
import TopNav from "../../components/nav/topnav/NavBar.js"
import SideNav from "../../components/nav/sidenav/NavBar.js"

const AccountProvider = ({ description, header, tabs, Target }) => {
    const [connectedAccount, setConnectedAccount] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    window.ethereum.on("accountsChanged", async (accounts) => {
        setConnectedAccount(accounts[0])
        await createNewDocument(accounts[0])
    })

    useEffect(() => {
        getConnectedAccounts().then(async (accounts) => {
            if (accounts.length > 0) {
                await createNewDocument(accounts[0])
                setConnectedAccount(accounts[0])
            }
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div></div>
    } else {
        if (connectedAccount) {
            return (
                <Fragment>
                    <TopNav pr="5" py="2" />
                    <Flex minHeight="95vh">
                        <Box bg="gray.700" flex="1">
                            <SideNav py="0" tabs={tabs} />
                        </Box>
                        <Box flex="6">
                            <Box bg="gray.900" px="10" py="5">
                                <Box fontSize="lg">{header}</Box>
                                <Box fontSize="xs">{description}</Box>
                            </Box>
                            <Box p="10">
                                <Route render={props => <Target {...props} connectedAccount={connectedAccount} />} />
                            </Box>
                        </Box>
                    </Flex>
                </Fragment>
            )
        } else {
            return <Redirect to="/login" />
        }
    }
}

export default AccountProvider