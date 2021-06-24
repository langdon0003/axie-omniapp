import { database, firebase } from "../../config.js"
import moment from "moment"

export const getScholars = async (address) => {
    return (await database.collection("users").doc(address.toLowerCase()).get()).data().scholars
}

export const addScholar = async (address, newScholar) => {
    address = address.toLowerCase()
    newScholar.roninAddress = newScholar.roninAddress.toLowerCase()

    assertValidScholar(newScholar)

    const currentScholars = await getScholars(address)
    if (currentScholars.some(scholar => scholar.discord === newScholar.discord)) {
        throw new Error(`Scholar: ${newScholar.discord} already exists.`)
    } else {
        await database.collection("users").doc(address).update({
            scholars: firebase.firestore.FieldValue.arrayUnion(newScholar)
        })
    }
}

export const updateScholar = async (address, updatedScholar) => {
    address = address.toLowerCase()
    updatedScholar.roninAddress = updatedScholar.roninAddress.toLowerCase()

    assertValidScholar(updatedScholar)

    const currentScholars = await getScholars(address)
    const original = currentScholars.find(scholar => scholar.discord === updatedScholar.discord)
    if (!original) {
        throw new Error(`Scholar: ${updatedScholar.discord} does not exist.`)
    } else {
        Object.entries(updatedScholar).forEach(([key, value]) => {
            original[key] = value
        })
        await database.collection("users").doc(address).update({
            scholars: currentScholars
        })
    }
}

export const getScholarAccounts = async (address) => {
    return (await database.collection("users").doc(address.toLowerCase()).get()).data().scholar_accounts
}

export const addScholarAccount = async (address, scholarAccount) => {
    address = address.toLowerCase()
    scholarAccount.ethAddress = scholarAccount.ethAddress.toLowerCase()

    assertValidScholarAccount(scholarAccount)

    const currentAccounts = await getScholarAccounts(address)
    if (currentAccounts.some(account => account.ethAddress === scholarAccount.ethAddress)) {
        throw new Error(`Scholar account with address: ${scholarAccount.ethAddress} already exists.`)
    } else {
        await database.collection("users").doc(address).update({
            scholar_accounts: firebase.firestore.FieldValue.arrayUnion(scholarAccount)
        })
    }
}

export const updateScholarAccount = async (address, scholarAccount) => {
    address = address.toLowerCase()
    scholarAccount.ethAddress = scholarAccount.ethAddress.toLowerCase()

    assertValidScholarAccount(scholarAccount)

    const currentAccounts = await getScholarAccounts(address)
    const original = currentAccounts.find(account => account.ethAddress === scholarAccount.ethAddress)
    if (!original) {
        throw new Error(`Scholar account: ${scholarAccount.ethAddress} does not exist.`)
    } else {
        Object.entries(scholarAccount).forEach(([key, value]) => {
            original[key] = value
        })
        await database.collection("users").doc(address).update({
            scholar_accounts: currentAccounts
        })
    }
}

const assertValidScholar = (scholar) => {
    if (!!scholar.name && !!scholar.discord && !!scholar.roninAddress && !!scholar.age &&
        !!scholar.sex && !!scholar.country && !!scholar.city && !!scholar.experience && !!scholar.startDate) {
        if (!!scholar.endDate && moment(scholar.endDate).isSameOrBefore(moment(scholar.startDate))) {
            throw new Error("Termination date cannot be on or before start date.")
        }
    }
}

const assertValidScholarAccount = (scholarAccount) => {
    if (!scholarAccount.name || !scholarAccount.scholar || !scholarAccount.ethAddress || !scholarAccount.quota || !scholarAccount.share) {
        throw new Error("Missing fields detected.")
    }
}