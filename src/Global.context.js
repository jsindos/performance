import { createContext } from 'react'

const GlobalContext = createContext()

export default GlobalContext

// only runtime constants are provided here, to stop re-renders
export const GlobalContextProvider = ({ children, SERVER_URL, IS_TESTING_PERFORMANCE }) => {
  const value = {
    SERVER_URL,
    IS_TESTING_PERFORMANCE
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}
