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
  CircularProgress,
  Link,
} from '@mui/material';
import {
  Search,
  WhatsApp,
  Email,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  donationPercentage: number;
  causeId: string;
  causeName: string;
  guiverId: string;
  guiverName: string;
  contactInfo: {
    whatsapp: string;
    email: string;
  };
}

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  const products: Product[] = [
    {
      id: '1',
      title: 'Eco-Friendly Water Bottle',
      description: 'Reusable water bottle made from recycled materials. Each purchase helps fund clean water initiatives.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?water-bottle',
      price: 29.99,
      donationPercentage: 15,
      causeId: '1',
      causeName: 'Save the Amazon Rainforest',
      guiverId: '1',
      guiverName: 'John Doe',
      contactInfo: {
        whatsapp: '+1234567890',
        email: 'john@example.com',
      },
    },
    {
      id: '2',
      title: 'Educational Board Game',
      description: 'Fun and educational game for children. Proceeds support education in underprivileged areas.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?board-game',
      price: 34.99,
      donationPercentage: 20,
      causeId: '2',
      causeName: 'Education for All',
      guiverId: '2',
      guiverName: 'Jane Smith',
      contactInfo: {
        whatsapp: '+1987654321',
        email: 'jane@example.com',
      },
    },
    {
      id: '3',
      title: 'Wildlife Photography Print',
      description: 'Beautiful wildlife photography print on recycled paper.',
      imageUrl: 'https://source.unsplash.com/random/800x600/?wildlife-photography',
      price: 49.99,
      donationPercentage: 25,
      causeId: '3',
      causeName: 'Wildlife Protection',
      guiverId: '3',
      guiverName: 'Bob Johnson',
      contactInfo: {
        whatsapp: '+1357924680',
        email: 'bob@example.com',
      },
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
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
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${product.price}
                    </Typography>
                    <Chip
                      label={`${product.donationPercentage}% to cause`}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    By: <Link href={`/profile/${product.guiverId}`}>{product.guiverName}</Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Supporting: <Link href={`/causes/${product.causeId}`}>{product.causeName}</Link>
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Contact Seller:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Link href={`https://wa.me/${product.contactInfo.whatsapp}`} target="_blank">
                      <Button
                        variant="outlined"
                        startIcon={<WhatsApp />}
                        size="small"
                      >
                        WhatsApp
                      </Button>
                    </Link>
                    <Link href={`mailto:${product.contactInfo.email}`}>
                      <Button
                        variant="outlined"
                        startIcon={<Email />}
                        size="small"
                      >
                        Email
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Add Product Button (only show if user is authenticated and is an entrepreneur) */}
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
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default ProductsPage;
