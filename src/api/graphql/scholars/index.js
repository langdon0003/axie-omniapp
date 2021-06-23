import client from "../client.js"
import { GET_OWNED_AXIES } from "./queries.js"

export const getOwnedAxies = async () => {
    const response = await client.query({
        operationName: "GetAxieBriefList",
        query: GET_OWNED_AXIES,
        variables: {
            owner: "0x2ccca10f1bf4468034c9ed17acae0b90453ad211"
        }
    })
    return response.data
}