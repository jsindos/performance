/* global __DEV__ */

import React, { useCallback } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import AppNavigator from './src/AppNavigator'
import { LogLevel, PerformanceProfiler, RenderPassReport } from '@shopify/react-native-performance'
import { init, track } from '@amplitude/analytics-react-native'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})

init('2f087f79fc2135316f17500b98df050c')

function App () {
  const onReportPrepared = useCallback((report: RenderPassReport) => {
    const totalTime = (report.timeToRenderMillis || 0) + (report.timeToConsumeTouchEventMillis || 0)
    // track('pop_performance', { ...report, totalTimeToTransitionMillis: totalTime, __DEV__ })
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
