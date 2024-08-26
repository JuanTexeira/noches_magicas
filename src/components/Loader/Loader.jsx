import { CircularProgress } from '@mui/material'
import React from 'react'

export const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        /* position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999  */
      }}
    >
      <CircularProgress color="primary" />
    </div>
  )
}
