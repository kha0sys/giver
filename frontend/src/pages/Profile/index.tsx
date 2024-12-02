import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Button,
  Link,
  Paper,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Mock data - replace with actual API calls
  const guiverData = {
    id: '1',
    name: 'Juan Pérez',
    type: 'entrepreneur',
    bio: 'Apasionado por crear productos sostenibles que marquen la diferencia.',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait',
    location: 'Ciudad de México',
    email: 'juan@example.com',
    phone: '+52 (555) 123-4567',
    website: 'www.juanperez.com',
    stats: {
      causesCreated: 12,
      causesSupported: 45,
      impact: '25K',
    },
    causes: [
      {
        id: '1',
        title: 'Reforestación Urbana',
        type: 'ambiental',
        status: 'activa',
        supporters: 156,
        image: 'https://source.unsplash.com/random/400x300/?reforestation',
      },
      {
        id: '2',
        title: 'Educación para Todos',
        type: 'social',
        status: 'completada',
        supporters: 89,
        image: 'https://source.unsplash.com/random/400x300/?education',
      },
    ],
    products: [
      {
        id: '1',
        name: 'Bolsas Ecológicas',
        price: '$299',
        impact: '5%',
        image: 'https://source.unsplash.com/random/400x300/?eco-bag',
      },
      {
        id: '2',
        name: 'Botellas Reutilizables',
        price: '$199',
        impact: '3%',
        image: 'https://source.unsplash.com/random/400x300/?reusable-bottle',
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  src={guiverData.avatar}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h4">{guiverData.name}</Typography>
                  <Chip
                    label={guiverData.type === 'entrepreneur' ? 'Emprendedor' : 'Guiver'}
                    color="primary"
                  />
                </Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {guiverData.bio}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box>
                    <Typography variant="h6">{guiverData.stats.causesCreated}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Causas Creadas
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">{guiverData.stats.causesSupported}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Causas Apoyadas
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">${guiverData.stats.impact}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Impacto Generado
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Seguir
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Información de Contacto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon color="action" />
                  <Typography>{guiverData.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon color="action" />
                  <Typography>{guiverData.phone}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon color="action" />
                  <Link href={`https://${guiverData.website}`} target="_blank">
                    {guiverData.website}
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon color="action" />
                  <Typography>{guiverData.location}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Causas" />
            <Tab label="Productos" />
          </Tabs>
        </Box>

        {/* Causes Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {guiverData.causes.map((cause) => (
              <Grid item xs={12} sm={6} key={cause.id}>
                <Card>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${cause.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={cause.type}
                        color={cause.type === 'ambiental' ? 'success' : 'primary'}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={cause.status}
                        color={cause.status === 'activa' ? 'warning' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {cause.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cause.supporters} seguidores
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Products Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {guiverData.products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h5" color="primary">
                        {product.price}
                      </Typography>
                      <Chip
                        label={`${product.impact} Impacto`}
                        color="success"
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Logout Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            fullWidth
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
