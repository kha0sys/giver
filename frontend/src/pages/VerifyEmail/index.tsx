import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const VerifyEmailPage = () => {
  const { currentUser, resendVerificationEmail } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resendVerificationEmail();
      setMessage('Email de verificación enviado. Por favor revisa tu bandeja de entrada.');
    } catch (err) {
      setError('Error al enviar el email de verificación.');
    } finally {
      setLoading(false);
    }
  };

  // Si no hay usuario, redirigir al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario ya verificó su email, redirigir al feed
  if (currentUser.emailVerified) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Verifica tu Email
          </Typography>

          <Alert severity="info" sx={{ width: '100%', mb: 3 }}>
            Hemos enviado un email de verificación a {currentUser.email}.
            Por favor revisa tu bandeja de entrada y sigue las instrucciones.
          </Alert>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {message}
            </Alert>
          )}

          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            ¿No recibiste el email? Haz clic en el botón para enviar otro.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={handleResendEmail}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            Reenviar Email de Verificación
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ mt: 1 }}
          >
            Volver a Iniciar Sesión
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;
