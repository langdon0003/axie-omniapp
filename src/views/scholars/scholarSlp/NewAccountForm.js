import { Box, Button, Flex, Heading, Select } from "@chakra-ui/react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { addScholarAccount, getScholars } from "../../../firebase/firestore/scholars"
import moment from "moment"

const NewAccountForm = ({ connectedAccount, postSubmit }) => {
    const [scholars, setScholars] = useState([])
    const [formObject, setFormObject] = useState({
        name: "",
        scholar: "",
        ethAddress: "",
        quota: 150,
        share: 30,
        createDate: moment().format("YYYY-MM-DD")
    })

    const updateFormInput = (event, field) => {
        setFormObject({
            ...formObject,
            [field]: event.target ? event.target.value : event
        })
    }

    const submitForm = async () => {
        if (Object.values(formObject).every(value => !!value)) {
            try {
                await addScholarAccount(connectedAccount, formObject)
                setFormObject({
                    name: "",
                    scholar: "",
                    ethAddress: "",
                    quota: 150,
                    share: 30,
                    createDate: moment().format("YYYY-MM-DD")
                })
                await postSubmit(formObject)
            } catch (error) {
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        getScholars(connectedAccount).then(scholars => {
            setScholars(scholars)
        })
    }, [connectedAccount])

    return (
        <Box bg="blue.800" borderRadius={5} mb={3} p={3} w="100%">
            <Heading mb={3} size="sm">Add a scholarship account</Heading>
            <Flex mb={2}>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Account Name</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "name")} size="sm" type="text" value={formObject.name} />
                </FormControl>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Scholar Discord Username</FormLabel>
                    <Select onChange={(e) => updateFormInput(e, "scholar")} placeholder="Select scholar" size="sm" value={formObject.scholar}>
                    {
                        scholars.map(scholar => (
                            <option key={scholar.discord} value={scholar.discord}>{scholar.discord}</option>
                        ))
                    }
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="none">Ethereum Address</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "ethAddress")} size="sm" type="text" value={formObject.ethAddress} />
                </FormControl>
            </Flex>
            <Flex mb={5}>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Minimum Daily SLP</FormLabel>
                    <NumberInput size="sm" min={0} max={500} onChange={(e) => updateFormInput(e, "quota")} value={formObject.quota}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Scholar Share</FormLabel>
                    <NumberInput size="sm" min={1} max={99} onChange={(e) => updateFormInput(e, "share")} value={formObject.share}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="none">Create Date</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "createDate")} size="sm" type="date" value={formObject.createDate} />
                </FormControl>
            </Flex>
            <Flex justifyContent="flex-end">
                <Button colorScheme="facebook" onClick={submitForm} size="sm" w="15%">Add Account</Button>
            </Flex>
        </Box>
    )
}

export default NewAccountForm