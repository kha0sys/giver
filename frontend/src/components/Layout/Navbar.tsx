import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => {
              if (currentUser?.emailVerified) {
                navigate('/feed');
              } else {
                navigate('/');
              }
            }}
          >
            Guiver
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {currentUser?.emailVerified ? (
              // Usuario autenticado y verificado
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/feed"
                >
                  Feed
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/givers"
                >
                  Givers
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                >
                  Mi Perfil
                </Button>
              </>
            ) : (
              // Usuario no autenticado o no verificado
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    },
                  }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
