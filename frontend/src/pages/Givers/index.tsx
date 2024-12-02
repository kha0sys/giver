import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Rating,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

interface Giver {
  id: string;
  name: string;
  avatar: string;
  isEntrepreneur: boolean;
  bio: string;
  location: string;
  rating: number;
  reviews: number;
  causesCreated: number;
  causesSupported: number;
  productsCreated: number;
  points: number;
  tags: string[];
  isFollowed?: boolean;
}

const GiversPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showOnlyEntrepreneurs, setShowOnlyEntrepreneurs] = useState(false);

  // Mock data - replace with API call
  const givers: Giver[] = [
    {
      id: '1',
      name: 'María González',
      avatar: 'https://source.unsplash.com/random/150x150/?woman',
      isEntrepreneur: true,
      bio: 'Giver y emprendedora social enfocada en proyectos de educación y sostenibilidad.',
      location: 'Ciudad de México',
      rating: 4.8,
      reviews: 156,
      causesCreated: 12,
      causesSupported: 45,
      productsCreated: 8,
      points: 2500,
      tags: ['educación', 'sostenibilidad', 'comunidad'],
      isFollowed: true,
    },
    {
      id: '2',
      name: 'Juan Pérez',
      avatar: 'https://source.unsplash.com/random/150x150/?man',
      isEntrepreneur: true,
      bio: 'Giver comprometido con el medio ambiente. Creador de productos ecológicos.',
      location: 'Guadalajara',
      rating: 4.5,
      reviews: 89,
      causesCreated: 8,
      causesSupported: 32,
      productsCreated: 5,
      points: 1800,
      tags: ['ecología', 'productos-sostenibles', 'medioambiente'],
    },
    {
      id: '3',
      name: 'Ana Martínez',
      avatar: 'https://source.unsplash.com/random/150x150/?woman-portrait',
      isEntrepreneur: false,
      bio: 'Giver activa en causas de igualdad y derechos humanos.',
      location: 'Monterrey',
      rating: 4.9,
      reviews: 234,
      causesCreated: 0,
      causesSupported: 78,
      productsCreated: 0,
      points: 1200,
      tags: ['derechos-humanos', 'igualdad', 'activismo'],
    },
  ];

  // Lista única de tags de todos los givers
  const allTags = Array.from(
    new Set(givers.flatMap(giver => giver.tags))
  ).sort();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleGiverClick = (giverId: string) => {
    navigate(`/profile/${giverId}`);
  };

  const filteredGivers = givers.filter(giver => {
    const matchesSearch = 
      giver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      giver.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      giver.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags = 
      selectedTags.length === 0 ||
      selectedTags.every(tag => giver.tags.includes(tag));

    const matchesEntrepreneurFilter = 
      !showOnlyEntrepreneurs || giver.isEntrepreneur;

    return matchesSearch && matchesTags && matchesEntrepreneurFilter;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Búsqueda y Filtros */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar givers por nombre, descripción o ubicación..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label="Todos los Givers"
                onClick={() => setShowOnlyEntrepreneurs(false)}
                color={!showOnlyEntrepreneurs ? 'primary' : 'default'}
                variant={!showOnlyEntrepreneurs ? 'filled' : 'outlined'}
              />
              <Chip
                label="Givers Emprendedores"
                onClick={() => setShowOnlyEntrepreneurs(true)}
                color={showOnlyEntrepreneurs ? 'primary' : 'default'}
                variant={showOnlyEntrepreneurs ? 'filled' : 'outlined'}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {allTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        {/* Lista de Givers */}
        <Grid container spacing={3}>
          {filteredGivers.map((giver) => (
            <Grid item xs={12} md={6} lg={4} key={giver.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={() => handleGiverClick(giver.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={giver.avatar}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">
                        {giver.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                          label="Giver"
                          color="secondary"
                          size="small"
                        />
                        {giver.isEntrepreneur && (
                          <Chip
                            label="Emprendedor"
                            color="primary"
                            size="small"
                          />
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={giver.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          ({giver.reviews})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {giver.bio}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {giver.location}
                    </Typography>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={3}>
                      <Typography variant="h6">
                        {formatNumber(giver.causesCreated)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Causas Creadas
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">
                        {formatNumber(giver.causesSupported)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Causas Apoyadas
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">
                        {formatNumber(giver.productsCreated)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Productos
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h6">
                        {formatNumber(giver.points)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Puntos
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {giver.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                      variant={giver.isFollowed ? 'contained' : 'outlined'}
                      startIcon={giver.isFollowed ? <Favorite /> : <FavoriteBorder />}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implementar lógica de seguir/dejar de seguir
                      }}
                    >
                      {giver.isFollowed ? 'Siguiendo' : 'Seguir'}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGiverClick(giver.id);
                      }}
                    >
                      Ver Perfil
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GiversPage;
