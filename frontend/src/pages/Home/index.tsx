import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Paper,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Handshake,
  TrendingUp,
  GroupAdd,
  Storefront,
  Campaign,
  Favorite,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const impactStats = [
    {
      number: '1000+',
      label: 'Guivers Activos',
    },
    {
      number: '500+',
      label: 'Causas Apoyadas',
    },
    {
      number: '200+',
      label: 'Emprendimientos',
    },
    {
      number: '$50K+',
      label: 'Impacto Generado',
    },
  ];

  const howItWorks = [
    {
      icon: <Campaign color="primary" sx={{ fontSize: 40 }} />,
      title: 'Publica tu Causa',
      description: 'Comparte tu iniciativa social, ambiental o animal con la comunidad.',
    },
    {
      icon: <Storefront color="secondary" sx={{ fontSize: 40 }} />,
      title: 'Conecta con Emprendedores',
      description: 'Los emprendedores eligen apoyar tu causa con sus productos.',
    },
    {
      icon: <Handshake color="success" sx={{ fontSize: 40 }} />,
      title: 'Genera Impacto',
      description: 'Cada compra destina un porcentaje para financiar la causa.',
    },
  ];

  const benefits = [
    {
      icon: <TrendingUp />,
      title: 'Economía Colaborativa',
      description: 'Creamos un ciclo virtuoso donde todos ganan: las causas reciben apoyo, los emprendedores venden más y los compradores generan impacto.',
    },
    {
      icon: <GroupAdd />,
      title: 'Comunidad Comprometida',
      description: 'Une fuerzas con otros Guivers que comparten tus valores y multiplica el impacto de tus acciones.',
    },
    {
      icon: <Favorite />,
      title: 'Impacto Transparente',
      description: 'Seguimiento claro de cómo tu apoyo transforma vidas y mejora el mundo, con actualizaciones regulares de las causas.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          borderRadius: { xs: '0 0 24px 24px', md: '0 0 48px 48px' },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(https://source.unsplash.com/random/1920x1080/?community,collaboration)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3,
            }}
          >
            Juntos Creamos Más Impacto
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            La primera plataforma que une causas sociales con emprendimientos para crear una economía colaborativa
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/causes')}
              sx={{
                fontSize: '1.2rem',
                py: 2,
                px: 4,
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              }}
            >
              Explorar Causas
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                fontSize: '1.2rem',
                py: 2,
                px: 4,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Únete
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Impact Stats */}
      <Container maxWidth="lg" sx={{ mt: -4 }}>
        <Grid container spacing={2}>
          {impactStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'white',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          ¿Cómo Funciona?
        </Typography>
        <Grid container spacing={4}>
          {howItWorks.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {index < howItWorks.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: { xs: 'auto', md: '-50%' },
                      top: { xs: 'auto', md: '20%' },
                      bottom: { xs: '-10%', md: 'auto' },
                      left: { xs: '50%', md: 'auto' },
                      transform: { xs: 'translateX(-50%)', md: 'none' },
                      width: { xs: '2px', md: '100px' },
                      height: { xs: '50px', md: '2px' },
                      bgcolor: theme.palette.divider,
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                )}
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    mb: 2,
                  }}
                >
                  {step.icon}
                </Avatar>
                <Typography variant="h4" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: { xs: 6, md: 8 } }}
          >
            ¿Por Qué Guiver?
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      width: 56,
                      height: 56,
                      mb: 2,
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Sé Parte del Cambio
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 6, opacity: 0.9 }}
          >
            Únete a nuestra comunidad y descubre cómo tu participación puede transformar vidas
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ py: 2, px: 4 }}
            >
              Crear Cuenta
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/causes')}
              sx={{
                py: 2,
                px: 4,
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Ver Causas
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
