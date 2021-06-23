import client from "../client.js"
import { GET_ETH_RATE } from "./queries.js"

export const getEthExchangeRate = async () => {
    try {
        const response = await client.query({
            operationName: "EthExchangeRate",
            query: GET_ETH_RATE,
            variables: {}
        })
        return response.data
    } catch (error) {
        return 1
    }
}