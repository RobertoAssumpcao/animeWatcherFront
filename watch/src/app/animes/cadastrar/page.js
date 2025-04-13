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
      // Busca o gênero do anime via título
      const jikan = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(form.titulo)}`)
      const resultados = jikan.data.data

      let genero = 'Desconhecido'
      if (Array.isArray(resultados) && resultados.length > 0 && resultados[0].genres.length > 0) {
        genero = resultados[0].genres[0].name
      }

      // Cria objeto de dados e converte para URLSearchParams (form-urlencoded)
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
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Cadastrar Novo Anime
        </Typography>
        {erro && <Alert severity="error">{erro}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="titulo"
              label="Título"
              value={form.titulo}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="episodios"
              label="Episódios"
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
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}
