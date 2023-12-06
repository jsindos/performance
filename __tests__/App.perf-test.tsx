/**
 * @format
 */

import 'react-native'
import React from 'react'
import App from '../App'

// Note: import explicitly to use the types shiped with jest.
import { it } from '@jest/globals'

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer'
import { measurePerformance } from 'reassure'

it('renders correctly', async () => {
  // renderer.create(<App />)
  await measurePerformance(<App />)
})
