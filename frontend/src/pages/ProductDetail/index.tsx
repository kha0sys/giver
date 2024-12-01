import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Link,
  ImageList,
  ImageListItem,
  IconButton,
} from '@mui/material';
import {
  WhatsApp,
  Email,
  Share,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - replace with API call
  const product = {
    id: id,
    title: 'Botella de Agua Ecológica',
    description: `Botella de agua reutilizable hecha con materiales reciclados. 
    Cada compra ayuda a financiar iniciativas de agua limpia en comunidades necesitadas.
    
    Características:
    - Material: Acero inoxidable reciclado
    - Capacidad: 750ml
    - Aislamiento térmico
    - Libre de BPA
    - Diseño ergonómico`,
    price: 29.99,
    donationPercentage: 15,
    images: [
      'https://source.unsplash.com/random/800x600/?eco-bottle',
      'https://source.unsplash.com/random/800x600/?water-bottle',
      'https://source.unsplash.com/random/800x600/?sustainable-bottle',
    ],
    cause: {
      id: '1',
      name: 'Agua Limpia para Todos',
      description: 'Iniciativa para proporcionar agua potable a comunidades necesitadas.',
    },
    seller: {
      id: '1',
      name: 'María González',
      avatar: 'https://source.unsplash.com/random/100x100/?portrait',
      rating: 4.8,
      totalSales: 156,
      contactInfo: {
        whatsapp: '+1234567890',
        email: 'maria@example.com',
      },
    },
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `Mira este producto que apoya una buena causa: ${product.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí implementaremos la lógica para guardar en favoritos
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Imágenes del Producto */}
        <Grid item xs={12} md={7}>
          <Box sx={{ position: 'relative' }}>
            <ImageList
              sx={{
                width: '100%',
                height: 500,
                borderRadius: 2,
                overflow: 'hidden',
              }}
              variant="quilted"
              cols={4}
              rowHeight={250}
            >
              {product.images.map((img, index) => (
                <ImageListItem
                  key={index}
                  cols={index === 0 ? 4 : 2}
                  rows={index === 0 ? 2 : 1}
                >
                  <img
                    src={img}
                    alt={`${product.title} - ${index + 1}`}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
              <IconButton
                onClick={handleToggleFavorite}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton
                onClick={handleShare}
                sx={{ 
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Información del Producto */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Typography variant="h3" gutterBottom>
              {product.title}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              <Chip
                label={`${product.donationPercentage}% para la causa`}
                color="secondary"
                sx={{ mr: 1 }}
              />
            </Box>

            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>
              {product.description}
            </Typography>

            {/* Información del Vendedor */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información del Vendedor
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={product.seller.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Link
                      component={RouterLink}
                      to={`/profile/${product.seller.id}`}
                      color="inherit"
                      underline="hover"
                    >
                      <Typography variant="subtitle1">
                        {product.seller.name}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {product.seller.totalSales} productos vendidos
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<WhatsApp />}
                    href={`https://wa.me/${product.seller.contactInfo.whatsapp}`}
                    target="_blank"
                    fullWidth
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Email />}
                    href={`mailto:${product.seller.contactInfo.email}`}
                    fullWidth
                  >
                    Email
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Información de la Causa */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Esta compra apoya:
                </Typography>
                <Link
                  component={RouterLink}
                  to={`/causes/${product.cause.id}`}
                  color="inherit"
                  underline="hover"
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {product.cause.name}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  {product.cause.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
