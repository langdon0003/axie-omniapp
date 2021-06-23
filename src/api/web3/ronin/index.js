import { roninClient } from  "../client.js"

export const getClaimedSlp = async () => {
    const slpContract = new roninClient.eth.Contract(abi, "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25")
    return slpContract
}