/* global __DEV__ */

import React, { useCallback, useEffect, useState } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import AppNavigator from './src/AppNavigator'
import { LogLevel, PerformanceProfiler, RenderPassReport } from '@shopify/react-native-performance'
import { init, track } from '@amplitude/analytics-react-native'
import { GlobalContextProvider } from 'src/Global.context'

const SERVER_URL = 'http://localhost:8080/graphql'
const IS_TESTING_PERFORMANCE = !__DEV__ && SERVER_URL.includes('localhost')

const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache()
})

init('2f087f79fc2135316f17500b98df050c')

function App () {
  const [commitHash, setCommitHash] = useState(null)

  useEffect(() => {
    if (IS_TESTING_PERFORMANCE) {
      fetch('https://api.github.com/repos/jsindos/performance/commits')
        .then(response => response.json())
        .then(data => {
          const latestCommit = data[0]
          setCommitHash(latestCommit.sha)
          console.log(commitHash)
        })
        .catch(error => console.error(error))
    }
  }, [])

  const onReportPrepared = useCallback((report: RenderPassReport) => {
    const totalTime = (report.timeToRenderMillis || 0) + (report.timeToConsumeTouchEventMillis || 0)
    if (IS_TESTING_PERFORMANCE) {
      track('pop_performance', { ...report, totalTimeToTransitionMillis: totalTime, __DEV__, commitHash })
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <PerformanceProfiler logLevel={LogLevel.Info} onReportPrepared={onReportPrepared}>
        <GlobalContextProvider {...{ SERVER_URL, IS_TESTING_PERFORMANCE }}>
          <AppNavigator />
        </GlobalContextProvider>
      </PerformanceProfiler>
    </ApolloProvider>
  )
}

export default App
