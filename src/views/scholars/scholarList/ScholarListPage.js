import { IconButton, VStack } from "@chakra-ui/react"
import { Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdModeEdit } from "react-icons/md"
import { getScholars } from "../../../firebase/firestore/scholars/index.js"
import EditScholarForm from "./EditScholarForm.js"
import NewScholarForm from "./NewScholarForm.js"
import PaginatedTable from "../../../components/data/PaginatedTable.js"

const ScholarsPage = ({ connectedAccount }) => {
    const [scholars, setScholars] = useState([])
    const [editScholar, setEditScholar] = useState({})

    useEffect(() => {
        getScholars(connectedAccount).then(scholars => {
            setScholars(scholars)
        })
    }, [connectedAccount])

    return (
        <VStack>
            <NewScholarForm connectedAccount={connectedAccount} postSubmit={async () => setScholars(await getScholars(connectedAccount))} />
            <PaginatedTable itemsPerPage="10" size="md">
                <Thead displayname="Thead">
                    <Tr>
                        <Th>Scholar Name</Th>
                        <Th>Discord</Th>
                        <Th>Ronin Address</Th>
                        <Th>Age</Th>
                        <Th>Sex</Th>
                        <Th>City</Th>
                        <Th>Country</Th>
                        <Th>Experience</Th>
                        <Th>Date Started</Th>
                        <Th>Date Terminated</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody displayname="Tbody">
                {
                    scholars.map(scholar => (
                        <Tr displayname="Tr" key={`${scholar.discord}`}>
                            <Td>{scholar.name}</Td>
                            <Td>{scholar.discord}</Td>
                            <Td isTruncated maxWidth="4vw">{scholar.roninAddress}</Td>
                            <Td>{scholar.age}</Td>
                            <Td>{scholar.sex === "male" ? "Male" : "Female"}</Td>
                            <Td>{scholar.city}</Td>
                            <Td>{scholar.country}</Td>
                            <Td>{scholar.experience === "low" ? "Low" : scholar.experience === "medium" ? "Medium" : "High"}</Td>
                            <Td>{scholar.startDate}</Td>
                            <Td>{scholar.endDate}</Td>
                            <Th>
                                <IconButton colorScheme="facebook" icon={<MdModeEdit />} onClick={() => setEditScholar({ ...scholar, endDate: scholar.endDate || "" })} size="xs" />
                            </Th>
                        </Tr>
                    ))
                }
                </Tbody>
            </PaginatedTable>
            <EditScholarForm connectedAccount={connectedAccount}
                onClose={() => setEditScholar({})}
                postSubmit={async () => setScholars(await getScholars(connectedAccount))}
                scholar={editScholar} />
        </VStack>
    )
}

export default ScholarsPage