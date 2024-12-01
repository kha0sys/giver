import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Share,
} from '@mui/icons-material';

interface Cause {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'social' | 'environmental' | 'animal';
  location: string;
  likes: number;
  isLiked: boolean;
}

const CausesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const causes: Cause[] = [
    {
      id: '1',
      title: 'Save the Amazon Rainforest',
      description: 'Help protect the lungs of our planet and preserve biodiversity.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?rainforest',
      type: 'environmental',
      location: 'Brazil',
      likes: 1234,
      isLiked: false,
    },
    {
      id: '2',
      title: 'Education for All',
      description: 'Support education initiatives in underprivileged communities.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?education',
      type: 'social',
      location: 'Global',
      likes: 856,
      isLiked: true,
    },
    {
      id: '3',
      title: 'Wildlife Protection',
      description: 'Help protect endangered species and their habitats.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?wildlife',
      type: 'animal',
      location: 'Kenya',
      likes: 2045,
      isLiked: false,
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'social':
        return 'primary';
      case 'environmental':
        return 'success';
      case 'animal':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search causes..."
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label="All" color="primary" onClick={() => {}} />
          <Chip label="Social" onClick={() => {}} />
          <Chip label="Environmental" onClick={() => {}} />
          <Chip label="Animal" onClick={() => {}} />
        </Box>
      </Box>

      {/* Causes Grid */}
      <Grid container spacing={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          causes.map((cause) => (
            <Grid item xs={12} sm={6} md={4} key={cause.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={cause.imageUrl}
                  alt={cause.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={cause.type}
                      color={getTypeColor(cause.type)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={<LocationOn />}
                      label={cause.location}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {cause.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {cause.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    startIcon={cause.isLiked ? <Favorite /> : <FavoriteBorder />}
                  >
                    {cause.likes}
                  </Button>
                  <Button size="small" startIcon={<Share />}>
                    Share
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Add Cause Button (only show if user is authenticated) */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => {}}
          sx={{ borderRadius: '28px', px: 3 }}
        >
          Create Cause
        </Button>
      </Box>
    </Container>
  );
};

export default CausesPage;
