import { database } from "../../config.js"

export const createNewDocument = async (address) => {
    address = address.toLowerCase()
    const document = await database.collection("users").doc(address).get()
    if (!document.exists) {
        await database.collection("users").doc(address).set({
            scholars: [],
            scholar_accounts: []
        })
    }
}