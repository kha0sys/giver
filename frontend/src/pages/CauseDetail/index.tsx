import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Divider,
  Link,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Share,
  Update,
} from '@mui/icons-material';

interface CauseUpdate {
  id: string;
  date: string;
  content: string;
  images?: string[];
}

const CauseDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);

  // Mock data - replace with API call
  const cause = {
    id: '1',
    title: 'Salvemos el Amazonas',
    description: 'Una iniciativa para proteger y preservar la selva amazónica y su biodiversidad única.',
    type: 'ambiental',
    location: 'Amazonas, Brasil',
    createdAt: '2023-01-15',
    imageUrl: 'https://source.unsplash.com/random/1200x600/?amazon-rainforest',
    likes: 1234,
    creator: {
      id: '1',
      name: 'Juan Pérez',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait',
    },
    updates: [
      {
        id: '1',
        date: '2023-06-01',
        content: 'Hemos logrado plantar 500 árboles este mes gracias a nuestros colaboradores.',
        images: ['https://source.unsplash.com/random/800x600/?planting-trees'],
      },
      {
        id: '2',
        date: '2023-05-15',
        content: 'Nueva área protegida establecida en colaboración con autoridades locales.',
      },
    ],
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Image */}
      <Box
        sx={{
          height: 400,
          width: '100%',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={cause.imageUrl}
          alt={cause.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h2" gutterBottom>
              {cause.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={cause.type}
                color="primary"
                sx={{ textTransform: 'capitalize' }}
              />
              <Chip
                icon={<LocationOn />}
                label={cause.location}
                variant="outlined"
              />
            </Box>
            <Typography variant="body1" paragraph>
              {cause.description}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Updates Section */}
          <Box>
            <Typography variant="h4" gutterBottom>
              Actualizaciones
            </Typography>
            {cause.updates.map((update) => (
              <Card key={update.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Update color="action" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" color="text.secondary">
                      {update.date}
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {update.content}
                  </Typography>
                  {update.images && (
                    <Box
                      component="img"
                      src={update.images[0]}
                      alt="Update"
                      sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 24 }}>
            <CardContent>
              {/* Creator Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={cause.creator.avatar}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1">Creado por</Typography>
                  <Link
                    href={`/profile/${cause.creator.id}`}
                    color="inherit"
                    underline="hover"
                  >
                    <Typography variant="h6">{cause.creator.name}</Typography>
                  </Link>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Stats and Actions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Creado el {cause.createdAt}
                </Typography>
                <Typography variant="h6">
                  {cause.likes} personas apoyan esta causa
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isLiked ? <Favorite /> : <FavoriteBorder />}
                  onClick={handleLike}
                  fullWidth
                >
                  {isLiked ? 'Me gusta' : 'Me gusta'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  fullWidth
                >
                  Compartir
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CauseDetail;
