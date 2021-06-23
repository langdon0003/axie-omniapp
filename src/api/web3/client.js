import Web3 from "web3"

export const ethClient = new Web3(window.ethereum)
export const roninClient = new Web3(new Web3.providers.HttpProvider("https://api.roninchain.com/rpc"))