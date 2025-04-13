'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container, Typography, TextField, Button, MenuItem, Paper, Box, Stack, Alert
} from '@mui/material'
import { api } from '../../../services/api'
import axios from 'axios'

export default function CadastrarAnime() {
  const router = useRouter()

  const [form, setForm] = useState({
    titulo: '',
    episodios: '',
    status: ''
  })

  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setLoading(true)

    try {
      const jikan = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(form.titulo)}`)
      const resultados = jikan.data.data

      let genero = 'Desconhecido'
      if (Array.isArray(resultados) && resultados.length > 0 && resultados[0].genres.length > 0) {
        genero = resultados[0].genres[0].name
      }

      const payload = new URLSearchParams()
      payload.append('titulo', form.titulo.trim())
      payload.append('genero', genero)
      payload.append('episodios', parseInt(form.episodios))
      payload.append('status', form.status)

      await axios.post('http://localhost:5000/anime', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      router.push('/animes')
    } catch (err) {
      console.error(err)
      setErro('Erro ao cadastrar anime. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
            Cadastrar Novo Anime
          </Typography>

          {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="titulo"
                label="Título do Anime"
                value={form.titulo}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="episodios"
                label="Quantidade de Episódios"
                type="number"
                inputProps={{ min: 1 }}
                value={form.episodios}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="status"
                label="Status"
                select
                value={form.status}
                onChange={handleChange}
                required
                fullWidth
              >
                <MenuItem value="Assistindo">Assistindo</MenuItem>
                <MenuItem value="Finalizado">Finalizado</MenuItem>
                <MenuItem value="Pausado">Pausado</MenuItem>
                <MenuItem value="Abandonado">Abandonado</MenuItem>
                <MenuItem value="Planejo Assistir">Planejo Assistir</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', letterSpacing: 1 }}
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
