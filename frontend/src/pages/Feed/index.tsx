import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  Search,
  FilterList,
} from '@mui/icons-material';

interface Post {
  id: string;
  type: 'product' | 'cause';
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  isLiked?: boolean;
  tags: string[];
  // Para productos
  price?: number;
  donationPercentage?: number;
  // Para causas
  goalAmount?: number;
  currentAmount?: number;
  supporters?: number;
}

const FeedPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'products' | 'causes'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      type: 'product',
      title: 'Botella de Agua Ecológica',
      description: 'Botella reutilizable hecha de materiales reciclados. Cada compra ayuda a financiar iniciativas de agua limpia.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?eco-bottle',
      createdAt: new Date('2024-01-15'),
      author: {
        id: '1',
        name: 'Juan Pérez',
        avatar: 'https://source.unsplash.com/random/100x100/?portrait',
      },
      likes: 24,
      isLiked: false,
      tags: ['ecológico', 'sostenible', 'agua'],
      price: 299.99,
      donationPercentage: 15,
    },
    {
      id: '2',
      type: 'cause',
      title: 'Reforestación Urbana',
      description: 'Proyecto para plantar 1,000 árboles en áreas urbanas y crear espacios verdes en la ciudad.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?urban-forest',
      createdAt: new Date('2024-01-14'),
      author: {
        id: '2',
        name: 'María González',
        avatar: 'https://source.unsplash.com/random/100x100/?woman',
      },
      likes: 156,
      isLiked: true,
      tags: ['medioambiente', 'ciudad', 'comunidad'],
      goalAmount: 50000,
      currentAmount: 35000,
      supporters: 89,
    },
    {
      id: '3',
      type: 'product',
      title: 'Juego de Mesa Educativo',
      description: 'Juego divertido y educativo para niños. Los ingresos apoyan la educación en áreas desfavorecidas.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?board-game',
      createdAt: new Date('2024-01-13'),
      author: {
        id: '3',
        name: 'Ana García',
        avatar: 'https://source.unsplash.com/random/100x100/?woman-portrait',
      },
      likes: 45,
      isLiked: false,
      tags: ['educación', 'niños', 'juegos'],
      price: 349.99,
      donationPercentage: 20,
    },
  ]);

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: 'all' | 'products' | 'causes',
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleShare = async (post: Post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  const handlePostClick = (post: Post) => {
    if (post.type === 'product') {
      navigate(`/products/${post.id}`);
    } else {
      navigate(`/causes/${post.id}`);
    }
  };

  const handleAuthorClick = (authorId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/profile/${authorId}`);
  };

  const filteredPosts = posts
    .filter(post => {
      if (filter === 'all') return true;
      return filter === post.type + 's';
    })
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Filtros y Búsqueda */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                aria-label="filtro de contenido"
                fullWidth
              >
                <ToggleButton value="all">
                  Todos
                </ToggleButton>
                <ToggleButton value="products">
                  Productos
                </ToggleButton>
                <ToggleButton value="causes">
                  Causas
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar por título, descripción o etiquetas..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Lista de Posts */}
        <Grid container spacing={3}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
                onClick={() => handlePostClick(post)}
              >
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={post.imageUrl}
                      alt={post.title}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent>
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={post.author.avatar}
                          sx={{ width: 40, height: 40, cursor: 'pointer' }}
                          onClick={(e) => handleAuthorClick(post.author.id, e)}
                        />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ cursor: 'pointer' }}
                            onClick={(e) => handleAuthorClick(post.author.id, e)}
                          >
                            {post.author.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.createdAt.toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="h5" gutterBottom>
                        {post.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" paragraph>
                        {post.description}
                      </Typography>

                      {post.type === 'product' ? (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" color="primary" gutterBottom>
                            ${post.price}
                          </Typography>
                          <Chip
                            label={`${post.donationPercentage}% para la causa`}
                            color="secondary"
                            size="small"
                          />
                        </Box>
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>
                            Meta: ${post.goalAmount?.toLocaleString()}
                          </Typography>
                          <Box sx={{ position: 'relative', height: 8, bgcolor: 'grey.200', borderRadius: 1, mb: 1 }}>
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                bgcolor: 'primary.main',
                                borderRadius: 1,
                                width: `${(post.currentAmount! / post.goalAmount!) * 100}%`,
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            ${post.currentAmount?.toLocaleString()} recaudados • {post.supporters} apoyos
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        {post.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post.id);
                          }}>
                            {post.isLiked ? (
                              <Favorite color="error" />
                            ) : (
                              <FavoriteBorder />
                            )}
                          </IconButton>
                          <Typography variant="body2">
                            {post.likes}
                          </Typography>
                          <IconButton onClick={(e) => {
                            e.stopPropagation();
                            handleShare(post);
                          }}>
                            <Share />
                          </IconButton>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePostClick(post);
                          }}
                        >
                          {post.type === 'product' ? 'Ver Producto' : 'Ver Causa'}
                        </Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FeedPage;
