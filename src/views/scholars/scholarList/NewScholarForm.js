import { Box, Button, Flex, Heading, Select } from "@chakra-ui/react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react"
import { useState } from "react"
import { addScholar } from "../../../firebase/firestore/scholars/index.js"
import moment from "moment"

const NewScholarForm = ({ connectedAccount, postSubmit }) => {
    const [formObject, setFormObject] = useState({
        name: "",
        discord: "",
        roninAddress: "",
        age: 18,
        sex: "male",
        city: "",
        country: "",
        experience: "low",
        startDate: moment().format("YYYY-MM-DD")
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
                await addScholar(connectedAccount, {
                    ...formObject,
                    endDate: ""
                })
                setFormObject({
                    name: "",
                    discord: "",
                    roninAddress: "",
                    age: 18,
                    sex: "male",
                    country: "",
                    city: "",
                    experience: "low",
                    startDate: moment().format("YYYY-MM-DD")
                })
                await postSubmit()
            } catch (error) {
                alert(error.message)
            }
        }
    }

    return (
        <Box bg="blue.800" borderRadius={5} mb={3} p={3} w="100%">
            <Heading mb={3} size="sm">Add a Scholar</Heading>
            <Flex mb={2}>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Scholar Full Name</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "name")} size="sm" type="text" value={formObject.name} />
                </FormControl>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Discord</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "discord")} size="sm" type="text" value={formObject.discord} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="none">Ronin Address</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "roninAddress")} size="sm" type="text" value={formObject.roninAddress} />
                </FormControl>
            </Flex>
            <Flex mb={2}>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Age</FormLabel>
                    <NumberInput size="sm" min={10} max={99} onChange={(e) => updateFormInput(e, "age")} value={formObject.age}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Sex</FormLabel>
                    <Select onChange={(e) => updateFormInput(e, "sex")} size="sm">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                </FormControl>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">City</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "city")} size="sm" type="text" value={formObject.city} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="none">Country</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "country")} size="sm" type="text" value={formObject.country} />
                </FormControl>
            </Flex>
            <Flex mb={5}>
                <FormControl isRequired mr={2}>
                    <FormLabel fontSize="sm" fontWeight="none">Experience</FormLabel>
                    <Select onChange={(e) => updateFormInput(e, "experience")} size="sm">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="none">Start Date</FormLabel>
                    <Input onChange={(e) => updateFormInput(e, "startDate")} size="sm" type="date" value={formObject.startDate} />
                </FormControl>
            </Flex>
            <Flex justifyContent="flex-end">
                <Button colorScheme="facebook" onClick={submitForm} size="sm" w="15%">Add Scholar</Button>
            </Flex>
        </Box>
    )
}

export default NewScholarForm