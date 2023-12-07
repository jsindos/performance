import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import AppNavigator from './src/AppNavigator'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

function App () {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
