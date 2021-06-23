import client from "./client.js"

export const getSlpBalance = async (ethAddress) => {
    try {
        let response = null
        let retries = 0
        while (response === null && retries < 4) {
            response = await client.get(`clients/${ethAddress}/items/1`)
        }
        return !!response ? response.data : response
    } catch (error) {
        return null
    }
}