import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Favorite, People, HandshakeOutlined } from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenido a Guiver
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Conectamos personas que quieren ayudar con causas y emprendedores sociales
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Únete a Nosotros
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Favorite sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Apoya Causas
              </Typography>
              <Typography>
                Descubre y apoya causas sociales que están haciendo la diferencia en tu comunidad.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <People sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Conecta con Emprendedores
              </Typography>
              <Typography>
                Conoce emprendedores sociales y sus proyectos innovadores que buscan generar impacto.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <HandshakeOutlined sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Genera Impacto
              </Typography>
              <Typography>
                Cada acción cuenta. Gana puntos por ayudar y forma parte de una comunidad comprometida.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
