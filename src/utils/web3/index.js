import { ethClient as web3 } from "../../api/web3/client.js"

export const convertFromWeiToEth = (wei) => {
    return Number(web3.utils.fromWei(wei, "ether"))
}