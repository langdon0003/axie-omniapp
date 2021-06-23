import { Flex, Stat, StatGroup, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getSlpExchangeRate } from "../../api/coingecko/index.js"
import { getEthExchangeRate } from "../../api/graphql/home/index.js"
import { getSlpBalance } from "../../api/lunacia/index.js"
import { getEthBalance } from "../../api/web3/ethereum/index.js"
import { convertFromWeiToEth } from "../../utils/web3/index.js"

const HomePage = ({ connectedAccount }) => {
    const [totalSlp, setTotalSlp] = useState(0)
    const [claimableSlp, setClaimableSlp] = useState(0)
    const [slpRate, setSlpRate] = useState(0)

    const [totalEth, setTotalEth] = useState(0)
    const [ethRate, setEthRate] = useState(0)

    useEffect(() => {
        getSlpBalance(connectedAccount).then(data => {
            setTotalSlp(data.total)
            setClaimableSlp(data.claimable_total)
        })
        getEthBalance(connectedAccount).then(wei => {
            setTotalEth(convertFromWeiToEth(wei).toFixed(4))
        })
        getSlpExchangeRate().then(rate => {
            setSlpRate(rate)
        })
        getEthExchangeRate().then(data => {
            setEthRate(data.ethExchangeRate.Usd)
        })
    })

    return (
        <Flex>
            <StatGroup bg="gray.500" borderRadius={5} p={3}>
                <Stat minWidth={200}>
                    <StatLabel>Ethereum Balance</StatLabel>
                    <StatNumber>{totalEth} ETH</StatNumber>
                    <StatHelpText>${(ethRate * totalEth).toFixed(2)} USD</StatHelpText>
                </Stat>
                <Stat minWidth={200}>
                    <StatLabel>Smooth Love Potion Balance</StatLabel>
                    <StatNumber>{totalSlp} SLP ({claimableSlp}/{totalSlp - claimableSlp})</StatNumber>
                    <StatHelpText>${(slpRate * totalSlp).toFixed(2)} USD</StatHelpText>
                </Stat>
            </StatGroup>
        </Flex>
    )
}

export default HomePage