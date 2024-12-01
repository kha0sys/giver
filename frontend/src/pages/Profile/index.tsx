import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Grid,
  Tab,
  Tabs,
  Card,
  CardContent,
  Chip,
  Button,
  Link,
} from '@mui/material';
import { Email, Phone, Language, LocationOn } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

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
  const [tabValue, setTabValue] = useState(0);
  const { currentUser } = useAuth();

  // Mock data - replace with actual API calls
  const guiverData = {
    id: '1',
    name: 'John Doe',
    type: 'entrepreneur',
    bio: 'Passionate about creating sustainable products that make a difference.',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait',
    location: 'San Francisco, CA',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    website: 'www.johndoe.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
    },
  };

  const causes = [
    {
      id: '1',
      title: 'Save the Amazon Rainforest',
      type: 'environmental',
      status: 'active',
      supporters: 1234,
    },
    {
      id: '2',
      title: 'Clean Ocean Initiative',
      type: 'environmental',
      status: 'active',
      supporters: 856,
    },
  ];

  const products = [
    {
      id: '1',
      title: 'Eco-Friendly Water Bottle',
      description: 'Made from recycled materials',
      price: 29.99,
      causeId: '1',
      causeName: 'Save the Amazon Rainforest',
      contactInfo: {
        whatsapp: '+1234567890',
        email: 'sales@example.com',
      },
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Profile Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar
          src={guiverData.avatar}
          sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          {guiverData.name}
        </Typography>
        <Chip
          label={guiverData.type === 'entrepreneur' ? 'Entrepreneur' : 'Helper'}
          color="primary"
          sx={{ mb: 2 }}
        />
        <Typography variant="body1" color="text.secondary" paragraph>
          {guiverData.bio}
        </Typography>
        
        {/* Contact Information */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Chip icon={<Email />} label={guiverData.email} />
          <Chip icon={<Phone />} label={guiverData.phone} />
          <Chip icon={<Language />} label={guiverData.website} />
          <Chip icon={<LocationOn />} label={guiverData.location} />
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Causes" />
          <Tab label="Products" />
          <Tab label="About" />
        </Tabs>
      </Box>

      {/* Causes Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {causes.map((cause) => (
            <Grid item xs={12} md={6} key={cause.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {cause.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={cause.type} color="primary" size="small" />
                    <Chip label={cause.status} color="success" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {cause.supporters} supporters
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
          {products.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Supporting: {product.causeName}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Contact Information:
                    </Typography>
                    <Link href={`https://wa.me/${product.contactInfo.whatsapp}`} target="_blank">
                      <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                        WhatsApp
                      </Button>
                    </Link>
                    <Link href={`mailto:${product.contactInfo.email}`}>
                      <Button variant="outlined" size="small">
                        Email
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* About Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Social Media
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            {Object.entries(guiverData.socialLinks).map(([platform, url]) => (
              <Link href={url} target="_blank" key={platform}>
                <Button variant="outlined">{platform}</Button>
              </Link>
            ))}
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            Email: {guiverData.email}
          </Typography>
          <Typography variant="body1" paragraph>
            Phone: {guiverData.phone}
          </Typography>
          <Typography variant="body1" paragraph>
            Website: {guiverData.website}
          </Typography>
          <Typography variant="body1">
            Location: {guiverData.location}
          </Typography>
        </Box>
      </TabPanel>
    </Container>
  );
};

export default ProfilePage;
