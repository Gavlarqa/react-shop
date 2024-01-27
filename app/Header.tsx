import { Button, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import Link from 'next/link'
// import Link from "next/link";

function Header ({ title }: { title: string }) {
  return (
    <Paper elevation={1} sx={{ marginBottom: '15px' }}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Register
        </Button>
      </Toolbar>
    </Paper>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
