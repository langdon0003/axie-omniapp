import { ethClient } from "../client.js"

export const getConnectedAccounts = async () => {
    return await ethClient.eth.getAccounts()
}

export const getEthBalance = async (address) => {
    return await ethClient.eth.getBalance(address)
}