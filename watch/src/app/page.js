'use client'
import { useRouter } from 'next/navigation'
import { Container, Typography, Button, Grid } from '@mui/material'

export default function Home() {
  const router = useRouter()

  return (
    <Container maxWidth="md" style={{ marginTop: '4rem' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Bem-vindo ao Anime Watcher
      </Typography>

      <Typography variant="body1" align="center" paragraph>
        Gerencie e acompanhe os animes que você já assistiu.
      </Typography>

      <Grid container spacing={2} justifyContent="center" marginTop={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => router.push('/animes')}>
            Ver Animes
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={() => router.push('/animes/cadastrar')}>
            Cadastrar Anime
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => router.push('/animes/estatisticas')}>
            Ver Estatísticas
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
