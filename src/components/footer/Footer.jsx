import { Link, Breadcrumbs, Typography, Box } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Instagram } from '@mui/icons-material'

export const Footer = () => {
  return (
    <Box position="static" className="bot" marginTop={3}>
      <Breadcrumbs aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          color="inherit"
          href="https://phm.uqbar-project.org/"
          data-testid='instagram'
        >
          <Instagram />
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="https://phm.uqbar-project.org/"
          data-testid='facebook'
        >
          <FacebookIcon />
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="https://phm.uqbar-project.org/"
          data-testid='title'
        >
          Noches Magicas
        </Link>
        <Typography data-testid='año' color="text.primary">2024</Typography>
      </Breadcrumbs>
    </Box>
  )
}
