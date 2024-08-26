import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/navbar'
import { Footer } from '../footer/Footer'
import { Box } from '@mui/material'
export const LayoutWrap = () => {
  return (
    <>
      <Navbar />
        {/* centrar router */}
        <Box sx={{ mt: 5 }}>
          <Outlet />
        </Box>
      <Footer />
    </>
  )
}

LayoutWrap.propTypes = {}
