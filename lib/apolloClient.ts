import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_MAGENTO_GRAPHQL_URL || 'https://your-magento-domain.com/graphql',
    headers: {
      Store: process.env.NEXT_PUBLIC_STORE_CODE || 'default',
    },
  }),
  cache: new InMemoryCache(),
})
