'use client'
import { useEffect, useState } from 'react'
import {
  Container, Typography, CircularProgress, Paper, Box, List, ListItem, ListItemText
} from '@mui/material'
import { api } from '../../../services/api'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

export default function Estatisticas() {
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/animes/estatisticas')
      .then(response => setDados(response.data))
      .catch(err => console.error('Erro ao carregar estatísticas:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Estatísticas dos Animes
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={4}><CircularProgress /></Box>
      ) : dados ? (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6">Total de animes: {dados.total_animes}</Typography>
          <Typography variant="h6">Média de episódios: {dados.media_episodios}</Typography>

          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom>Status dos Animes</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(dados.quantidade_por_status).map(([status, qtd]) => ({
                status, qtd
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qtd" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom>Top 3 Mais Longos</Typography>
            <List>
              {dados.top_3_mais_longos.map((anime, i) => (
                <ListItem key={i} divider>
                  <ListItemText
                    primary={`${anime.titulo}`}
                    secondary={`Episódios: ${anime.episodios}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      ) : (
        <Typography color="error">Não foi possível carregar as estatísticas.</Typography>
      )}
    </Container>
  )
}
