import { Box, Flex, IconButton, VStack } from "@chakra-ui/react"
import { Stat, StatGroup, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react"
import { Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdModeEdit } from "react-icons/md"
import { getSlpExchangeRate } from "../../../api/coingecko/index.js"
import { getSlpBalance } from "../../../api/lunacia/index.js"
import { getScholarAccounts, getScholars } from "../../../firebase/firestore/scholars/index.js"
import EditAccountForm from "./EditAccountForm.js"
import moment from "moment"
import NewAccountForm from "./NewAccountForm.js"
import PaginatedTable from "../../../components/data/PaginatedTable.js"


const ScholarSlpPage = ({ connectedAccount }) => {
    const [scholars, setScholars] = useState([])
    const [scholarAccounts, setScholarAccounts] = useState([])
    const [scholarBalances, setScholarBalances] = useState({})

    const [totalGrind, setTotalGrind] = useState(null)
    const [managerGrind, setManagerGrind] = useState(null)
    const [salary, setSalary] = useState(null)
    
    const [slpExchangeRate, setSlpExchangeRate] = useState(0)

    const [editAccount, setEditAccount] = useState({})

    const calculateManagerAndScholarIncome = (accounts, balances) => {
        let total = 0
        let managerPortion = 0
        let scholarPortion = 0
        accounts.forEach(account => {
            if (balances[account.ethAddress]) {
                total += balances[account.ethAddress].balance
                managerPortion += balances[account.ethAddress].balance * (100 - account.share) / 100
                scholarPortion += balances[account.ethAddress].balance * account.share / 100
            }
        })
        setTotalGrind(total)
        setManagerGrind(Math.round(managerPortion))
        setSalary(Math.round(scholarPortion))
    }

    useEffect(() => {
        const fetchTableData = async () => {
            setScholars(await getScholars(connectedAccount))
            const accounts = await getScholarAccounts(connectedAccount)
            setScholarAccounts(accounts)
            const slpBalances = await Promise.all(accounts.map(account => getSlpBalance(account.ethAddress)))
            const balances = {}
            slpBalances.forEach(slpData => {
                if (slpData) {
                    balances[slpData.client_id] = {
                        balance: slpData.total,
                        claimed: slpData.claimable_total,
                        locked: slpData.total - slpData.claimable_total,
                        lastClaimedDate: slpData.last_claimed_item_at ? moment.unix(slpData.last_claimed_item_at).local().format("YYYY-MM-DD") : null
                    }
                }
            })
            setScholarBalances(balances)
            calculateManagerAndScholarIncome(accounts, balances)
            setSlpExchangeRate(await getSlpExchangeRate())
        }
        fetchTableData()
    }, [connectedAccount])

    return (
        <VStack>
            <Flex width="100%" mb={3}>
                <Box>
                    <StatGroup bg="cyan.600" borderRadius={5} mb={3} mr={5} p={3}>
                        <Stat minWidth={300}>
                            <StatLabel>Manager Portion</StatLabel>
                            <StatNumber>{managerGrind} SLP</StatNumber>
                            <StatHelpText>${(slpExchangeRate * managerGrind).toFixed(2)} USD</StatHelpText>
                        </Stat>
                    </StatGroup>
                    <StatGroup bg="teal.600" borderRadius={5} mb={3} mr={5} p={3}>
                        <Stat minWidth={300}>
                            <StatLabel>Salary</StatLabel>
                            <StatNumber>{salary} SLP</StatNumber>
                            <StatHelpText>${(slpExchangeRate * salary).toFixed(2)} USD</StatHelpText>
                        </Stat>
                    </StatGroup>
                    <StatGroup bg="blue.700" borderRadius={5} mr={5} p={3}>
                        <Stat minWidth={300}>
                            <StatLabel>Total Grind</StatLabel>
                            <StatNumber>{totalGrind} SLP</StatNumber>
                            <StatHelpText>${(slpExchangeRate * totalGrind).toFixed(2)} USD</StatHelpText>
                        </Stat>
                    </StatGroup>
                </Box>
                <NewAccountForm connectedAccount={connectedAccount} postSubmit={async (formObject) => {
                    setScholarAccounts((await getScholarAccounts(connectedAccount)))
                    const slpData = await getSlpBalance(formObject.ethAddress)
                    setScholarBalances({
                        ...scholarBalances,
                        [formObject.ethAddress]: {
                            balance: slpData.total,
                            claimed: slpData.claimable_total,
                            locked: slpData.total - slpData.claimable_total,
                            lastClaimedDate: slpData.last_claimed_item_at ? moment.unix(slpData.last_claimed_item_at).local().format("YYYY-MM-DD") : null
                        }
                    })
                }} scholars={scholars} />
            </Flex>
            <PaginatedTable itemsPerPage="10" size="md">
                <Thead displayname="Thead">
                    <Tr>
                        <Th>Account Name</Th>
                        <Th>Scholar</Th>
                        <Th>Ethereum Address</Th>
                        <Th>SLP Balance (Claimed/Locked)</Th>
                        <Th>Manager Share</Th>
                        <Th>Scholar Share</Th>
                        <Th>Required Quota</Th>
                        <Th>Last Claimed</Th>
                        <Th>Date Created</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody displayname="Tbody">
                {
                    scholarAccounts.map(account => {
                        const slpData = scholarBalances[account.ethAddress]
                        const scholarSlp = slpData ? Math.round(slpData.balance * account.share / 100) : null
                        const managerSlp = scholarSlp ? slpData.balance - scholarSlp : null

                        return (
                            <Tr displayname="Tr" key={`${account.name}`}>
                                <Td>{account.name}</Td>
                                <Td>{account.scholar}</Td>
                                <Td isTruncated maxWidth="4vw">{account.ethAddress}</Td>
                                {
                                    scholarBalances[account.ethAddress] ? (
                                        <Td>{scholarBalances[account.ethAddress].balance} ({scholarBalances[account.ethAddress].claimed}/{scholarBalances[account.ethAddress].locked})</Td>
                                    ) : (
                                        <Td></Td>
                                    )
                                }
                                <Td>{managerSlp} ({account.share ? `${100 - account.share}%` : null})</Td>
                                <Td>{scholarSlp} ({account.share ? `${account.share}%` : null})</Td>
                                <Td>{account.quota}</Td>
                                <Td>{scholarBalances[account.ethAddress] ? scholarBalances[account.ethAddress].lastClaimedDate : null}</Td>
                                <Td>{account.createDate}</Td>
                                <Th>
                                    <IconButton colorScheme="facebook" icon={<MdModeEdit />} onClick={() => setEditAccount(account)} size="xs" />
                                </Th>
                            </Tr>
                        )
                    })
                }
                </Tbody>
            </PaginatedTable>
            <EditAccountForm
                connectedAccount={connectedAccount}
                onClose={() => setEditAccount({})}
                postSubmit={async () => setScholarAccounts(await getScholarAccounts(connectedAccount))}
                scholarAccount={editAccount}
                scholars={scholars} />
        </VStack>
    )
}

export default ScholarSlpPage