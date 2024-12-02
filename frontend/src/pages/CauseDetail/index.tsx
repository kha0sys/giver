import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  IconButton,
  Paper,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Share,
  Update,
  ArrowBack,
} from '@mui/icons-material';

interface CauseUpdate {
  id: string;
  date: string;
  content: string;
  images?: string[];
}

const CauseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    goal: 'Proteger 1000 hectáreas de selva amazónica',
    progress: 60,
    updates: [
      {
        id: '1',
        date: '2023-11-15',
        content: 'Hemos logrado proteger las primeras 600 hectáreas gracias al apoyo de la comunidad.',
        images: ['https://source.unsplash.com/random/800x600/?amazon-1'],
      },
      {
        id: '2',
        date: '2023-12-01',
        content: 'Iniciamos el programa de reforestación con especies nativas.',
        images: ['https://source.unsplash.com/random/800x600/?amazon-2'],
      },
    ],
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Compartir causa:', cause.id);
  };

  const handleBack = () => {
    navigate('/causes');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Volver a Causas
        </Button>

        {/* Hero Section */}
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${cause.imageUrl})`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.5)',
            }}
          />
          <Grid container>
            <Grid item md={8}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                }}
              >
                <Chip
                  label="Ambiental"
                  color="success"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h3" color="inherit" gutterBottom>
                  {cause.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {cause.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={<LocationOn />}
                    label={cause.location}
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleLike} sx={{ color: 'white' }}>
                      {isLiked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2">
                      {cause.likes}
                    </Typography>
                  </Box>
                  <IconButton onClick={handleShare} sx={{ color: 'white' }}>
                    <Share />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Objetivo
                </Typography>
                <Typography paragraph>
                  {cause.goal}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Actualizaciones
                </Typography>
                {cause.updates.map((update) => (
                  <Box key={update.id} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Update color="action" sx={{ mr: 1 }} />
                      <Typography variant="subtitle2" color="text.secondary">
                        {update.date}
                      </Typography>
                    </Box>
                    <Typography paragraph>
                      {update.content}
                    </Typography>
                    {update.images && update.images.map((image, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={image}
                        alt={`Actualización ${index + 1}`}
                        sx={{
                          width: '100%',
                          borderRadius: 1,
                          mb: 2,
                        }}
                      />
                    ))}
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      '& .creator-name': {
                        color: 'primary.main',
                      },
                    },
                  }}
                  onClick={() => navigate(`/profile/${cause.creator.id}`)}
                >
                  <Avatar
                    src={cause.creator.avatar}
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Creado por
                    </Typography>
                    <Typography 
                      variant="subtitle1"
                      className="creator-name"
                      sx={{ 
                        transition: 'color 0.2s',
                        fontWeight: 'medium',
                      }}
                    >
                      {cause.creator.name}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Apoyar esta causa
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CauseDetail;
