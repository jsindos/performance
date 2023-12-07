import React, { useCallback } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import AppNavigator from './src/AppNavigator'
import { LogLevel, PerformanceProfiler, RenderPassReport } from '@shopify/react-native-performance'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

function App () {
  const onReportPrepared = useCallback((report: RenderPassReport) => {
    // track('react_native_performance', report)
    console.log(JSON.stringify(report, null, 2))
  }, [])

  return (
    <ApolloProvider client={client}>
      <PerformanceProfiler logLevel={LogLevel.Info} onReportPrepared={onReportPrepared}>
        <AppNavigator />
      </PerformanceProfiler>
    </ApolloProvider>
  )
}

export default App
