import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://axieinfinity.com/graphql-server-v2/graphql",
    cache: new InMemoryCache()
})

export default client