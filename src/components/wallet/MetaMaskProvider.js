import React, { useEffect, useState } from 'react'
import { injected } from './Connectors'
import { useWeb3React } from '@web3-react/core'
import { LinearProgress } from '@mui/material'

function MetamaskProvider({ children }) {
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  const isActivated = localStorage.getItem("lastActive")
  console.log(isActivated)
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError && isActivated) {
          activateNetwork(injected)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [activateNetwork, networkActive, networkError])
  if (loaded) {
    return children
  }
  return <LinearProgress color="secondary" sx={{ my: 55, mx: 5 }} />
}

export default MetamaskProvider
