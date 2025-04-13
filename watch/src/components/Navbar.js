'use client'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material'

export default function Navbar() {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold', letterSpacing: 1 }}
          >
            Anime Watcher
          </Typography>

          <Box>
            <Button
              color="inherit"
              component={Link}
              href="/animes"
              sx={{ mx: 1, fontWeight: 500 }}
            >
              Lista
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/animes/cadastrar"
              sx={{ mx: 1, fontWeight: 500 }}
            >
              Cadastrar
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/animes/estatisticas"
              sx={{ mx: 1, fontWeight: 500 }}
            >
              Estatísticas
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
