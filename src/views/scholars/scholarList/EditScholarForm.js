import { Box, Button, Flex, Select } from "@chakra-ui/react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { updateScholar } from "../../../firebase/firestore/scholars"


const EditScholarForm = ({ connectedAccount, onClose, postSubmit, scholar }) => {
    const [formObject, setFormObject] = useState({})

    const updateFormInput = (event, field) => {
        setFormObject({
            ...formObject,
            [field]: event.target ? event.target.value : event
        })
    }

    const submitForm = async () => {
        if (Object.entries(formObject).every(([key, value]) => key === "endDate" || !!value)) {
            try {
                await updateScholar(connectedAccount, formObject)
                onClose()
                await postSubmit()
            } catch (error) {
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        setFormObject(scholar)
    }, [scholar])

    return (
        <Modal isCentered isOpen={!!Object.keys(formObject).length} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Scholar Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Flex mb={2}>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" fontWeight="none">Scholar Full Name</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "name")} size="sm" type="text" value={formObject.name} />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="none">Discord</FormLabel>
                                <Input isDisabled onChange={(e) => updateFormInput(e, "discord")} size="sm" type="text" value={formObject.discord} />
                            </FormControl>
                        </Flex>
                        <Flex mb={2}>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="none">Ronin Address</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "roninAddress")} size="sm" type="text" value={formObject.roninAddress} />
                            </FormControl>
                        </Flex>
                        <Flex mb={2}>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" fontWeight="none">City</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "city")} size="sm" type="text" value={formObject.city} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="none">Country</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "country")} size="sm" type="text" value={formObject.country} />
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
                                <Select onChange={(e) => updateFormInput(e, "sex")} size="sm" value={formObject.sex}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="none">Experience</FormLabel>
                                <Select onChange={(e) => updateFormInput(e, "experience")} size="sm" value={formObject.experience}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Select>
                            </FormControl>
                        </Flex>
                        <Flex>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" fontWeight="none">Start Date</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "startDate")} size="sm" type="date" value={formObject.startDate} />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="none">End Date</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "endDate")} size="sm" type="date" value={formObject.endDate} />
                            </FormControl>
                        </Flex>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={2} onClick={submitForm} size="sm">Submit</Button>
                    <Button colorScheme="red" onClick={onClose} size="sm">Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditScholarForm