import { gql } from "@apollo/client"

export const GET_ETH_RATE = gql`
    query EthExchangeRate {
        ethExchangeRate {
        ...EthExchangeRateType
        __typename
        }
    }
    fragment EthExchangeRateType on EthExchangeRate {
        Usd
        __typename
    }  
`