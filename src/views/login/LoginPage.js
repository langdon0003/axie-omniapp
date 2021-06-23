import { Button, Center, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AiOutlineLogin } from "react-icons/ai"
import { Redirect } from "react-router"
import { getConnectedAccounts } from "../../api/web3/ethereum/index.js"

const LoginPage = () => {
    const [connectedAccount, setConnectedAccount] = useState(null)

    useEffect(() => {
        if (window.ethereum) {
            getConnectedAccounts().then(accounts => {
                setConnectedAccount(accounts[0])
            })
        }
    }, [])

    const login = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        })
        if (accounts.length > 0) {
            setConnectedAccount(accounts[0])
        }
    }

    if (connectedAccount) {
        return <Redirect to="/" />
    } else {
        return (
            <Flex minHeight="100vh">
                <Center minWidth="100%">
                    <Container centerContent>
                        <Heading mb={5}>Axie Infinity Omni App</Heading>
                        {window.ethereum ?
                            <Button colorScheme="orange" leftIcon={<Icon as={AiOutlineLogin} />} onClick={login} size="lg">Login with Metamask</Button> :
                            <Text>You do not have MetaMask installed</Text>
                        }
                    </Container>
                </Center>
            </Flex>
        )
    }
}

export default LoginPage