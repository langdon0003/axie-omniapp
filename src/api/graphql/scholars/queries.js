import { gql } from "@apollo/client"

export const GET_OWNED_AXIES = gql`
    query GetAxieBriefList($owner: String) {
        axies(owner: $owner) {
            total
            results {
                ...AxieBrief
                __typename
            }
            __typename
            }
        }
    
    fragment AxieBrief on Axie {
        id
        name
        stage
        class
        breedCount
        image
        title
        battleInfo {
            banned
            __typename
        }
        auction {
            currentPrice
            currentPriceUSD
            __typename
        }
        parts {
            id
            name
            class
            type
            specialGenes
            __typename
        }
        __typename
    }
`