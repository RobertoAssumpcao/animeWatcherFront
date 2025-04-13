'use client';

import { useEffect, useState } from 'react';
import api from '../services/api';
import { Anime } from '../types/anime';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';

export default function Home() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get('/animes')
        .then(res => setAnimes(res.data.animes))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
  }, []);

  return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          📺 Animes Assistidos
        </Typography>

        {loading ? (
            <CircularProgress />
        ) : (
            <Grid container spacing={2}>
              {animes.map((anime: Anime) => (
                  <Grid item xs={12} sm={6} md={4} key={anime.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {anime.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Gênero: {anime.genero}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Episódios: {anime.episodios}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {anime.status}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
              ))}
            </Grid>
        )}
      </Container>
  );
}
