import { Box, Button, Flex, Select } from "@chakra-ui/react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { updateScholarAccount } from "../../../firebase/firestore/scholars"


const EditAccountForm = ({ connectedAccount, onClose, postSubmit, scholarAccount, scholars }) => {
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
                await updateScholarAccount(connectedAccount, formObject)
                onClose()
                await postSubmit()
            } catch (error) {
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        setFormObject(scholarAccount)
    }, [scholarAccount])

    return (
        <Modal isCentered isOpen={!!Object.keys(formObject).length} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Account Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Flex mb={2}>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" fontWeight="none">Account Name</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "name")} size="sm" type="text" value={formObject.name} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="none">Scholar</FormLabel>
                                <Select onChange={(e) => updateFormInput(e, "scholar")} placeholder="Select scholar" size="sm" value={formObject.scholar}>
                                {
                                    scholars.map(scholar => (
                                        <option key={scholar.discord} value={scholar.discord}>{scholar.discord}</option>
                                    ))
                                }
                                </Select>
                            </FormControl>
                        </Flex>
                        <Flex mb={2}>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="none">Ethereum Address</FormLabel>
                                <Input onChange={(e) => updateFormInput(e, "ethAddress")} size="sm" type="text" value={formObject.ethAddress} />
                            </FormControl>
                        </Flex>
                        <Flex mb={2}>
                            <FormControl isRequired mr={2}>
                                <FormLabel fontSize="sm" fontWeight="none">Minimum Quota</FormLabel>
                                <NumberInput size="sm" min={0} max={500} onChange={(e) => updateFormInput(e, "quota")} value={formObject.quota}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontSize="sm" fontWeight="none">Scholar Share</FormLabel>
                                <NumberInput size="sm" min={1} max={99} onChange={(e) => updateFormInput(e, "share")} value={formObject.share}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
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

export default EditAccountForm