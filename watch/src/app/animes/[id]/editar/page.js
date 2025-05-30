'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container, Typography, TextField, Button, MenuItem, Paper,
  Box, Stack, Alert, CircularProgress
} from '@mui/material'
import { api } from '../../../../services/api'
import axios from 'axios'

export default function EditarAnime({ params }) {
  const router = useRouter()
  const id = params.id

  const [form, setForm] = useState({
    titulo: '',
    episodios: '',
    status: ''
  })

  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const carregarAnime = async () => {
    try {
      const response = await api.get('/animes')
      const anime = response.data.animes.find((a) => a.id === parseInt(id))

      if (!anime) {
        setErro('Anime não encontrado.')
        return
      }

      setForm({
        titulo: anime.titulo,
        episodios: anime.episodios.toString(),
        status: anime.status
      })
    } catch (err) {
      console.error(err)
      setErro('Erro ao carregar anime.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) carregarAnime()
  }, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErro(null)

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

      await api.put(`/anime/${id}`, payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      router.push('/animes')
    } catch (err) {
      console.error(err)
      setErro('Erro ao atualizar anime.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e1f5fe, #fce4ec)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
            Editar Anime
          </Typography>

          {loading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
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
                    size="large"
                    fullWidth
                    sx={{ py: 1.5, fontWeight: 'bold', letterSpacing: 1 }}
                    disabled={saving}
                  >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}
