'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container, Typography, Card, CardContent, CardActions, CardMedia,
  Button, Grid, CircularProgress, Box, Chip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import { api } from '../../services/api'
import axios from 'axios'

export default function ListaAnimes() {
  const [animes, setAnimes] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const carregarAnimes = async () => {
    try {
      const response = await api.get('/animes')
      setAnimes(response.data.animes.map(anime => ({ ...anime, imagem: null })))
    } catch (err) {
      console.error('Erro ao buscar animes:', err)
    } finally {
      setLoading(false)
    }
  }

  const buscarImagem = async (titulo) => {
    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(titulo)}&limit=1`)
      const anime = res.data.data[0]
      return anime?.images?.jpg?.image_url || null
    } catch {
      return null
    }
  }

  const carregarImagens = async () => {
    const atualizados = await Promise.all(animes.map(async (anime) => {
      if (anime.imagem) return anime // já tem
      const imagem = await buscarImagem(anime.titulo)
      return { ...anime, imagem }
    }))
    setAnimes(atualizados)
  }

  const excluirAnime = async (id) => {
    if (typeof window !== 'undefined' && !confirm('Tem certeza que deseja excluir este anime?')) return
    try {
      await api.delete('/anime', { params: { id } })
      setAnimes((prev) => prev.filter(anime => anime.id !== id))
    } catch (err) {
      alert('Erro ao excluir anime.')
      console.error(err)
    }
  }

  useEffect(() => {
    carregarAnimes()
  }, [])

  useEffect(() => {
    if (animes.length > 0) {
      carregarImagens()
    }
  }, [animes.length])

  const animesFiltrados = filtroStatus === 'Todos'
    ? animes
    : animes.filter(anime => anime.status === filtroStatus)

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Lista de Animes</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Assistindo">Assistindo</MenuItem>
            <MenuItem value="Finalizado">Finalizado</MenuItem>
            <MenuItem value="Pausado">Pausado</MenuItem>
            <MenuItem value="Abandonado">Abandonado</MenuItem>
            <MenuItem value="Planejo Assistir">Planejo Assistir</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : animesFiltrados.length === 0 ? (
        <Typography>Nenhum anime encontrado com esse filtro.</Typography>
      ) : (
        <Grid container spacing={3}>
          {animesFiltrados.map((anime) => (
            <Grid item xs={12} sm={6} md={4} key={anime.id}>
              <Card>
                {anime.imagem ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={anime.imagem}
                    alt={anime.titulo}
                  />
                ) : (
                  <Box height="300px" display="flex" alignItems="center" justifyContent="center" bgcolor="#f0f0f0">
                    <Typography variant="caption">Carregando imagem...</Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6">{anime.titulo}</Typography>
                  <Typography variant="body2">Episódios: {anime.episodios}</Typography>
                  <Typography variant="body2">Gênero: {anime.genero}</Typography>
                  <Chip
                    label={anime.status}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => router.push(`/animes/${anime.id}/editar`)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => excluirAnime(anime.id)}
                  >
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
