import client from "./client.js"

export const getSlpExchangeRate = async () => {
    try {
        const response = await client.get("/simple/price", {
            params: {
                ids: "smooth-love-potion",
                vs_currencies: "usd"
            }
        })
        return response.data["smooth-love-potion"].usd
    } catch (error) {
        return 0
    }
}