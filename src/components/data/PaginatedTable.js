import { useState } from "react"
import { Table, Tbody, TableCaption, Tabs, TabList, Tab } from "@chakra-ui/react"

const PaginatedTable = ({ itemsPerPage, children, ...props }) => {
    const [currentPage, setCurrentPage] = useState(0)

    const transformChildren = () => {
        let head = children.filter(child => child.props.displayname === "Thead")?.[0]
        let body = children.filter(child => child.props.displayname === "Tbody")?.[0]

        return [head, body ? {...body, ...{props:{children: body.props.children?.flat().filter(child => child.props.displayname === "Tr")}}} : null]
    }

    const populatePages = (tbody) => {
        if (tbody) {
            const pages = []
            const rows = tbody.props.children || []
            for (let i = 0; i < rows.length; i++) {
                if (i % itemsPerPage === 0) {
                    pages.push([])
                }
                pages[pages.length - 1].push(rows[i])
            }
            return pages
        }
    }

    const [thead, tbody] = transformChildren()
    const tablePages = populatePages(tbody)

    return (
        tablePages && tablePages.length ? <Table {...props}>
            <TableCaption>
                <Tabs variant="soft-rounded" colorScheme="cyan" size="sm">
                    <TabList>
                    {
                        tablePages.map((page, index) =>
                            <Tab fontSize="xs" onClick={e => setCurrentPage(e.target.value)} value={index} key={index + 1}>{index + 1}</Tab>
                        )
                    }
                    </TabList>
                </Tabs>
            </TableCaption>
            {thead}
            <Tbody>{tablePages[currentPage].map(row => row)}</Tbody>
        </Table> : null
    )
}

export default PaginatedTable