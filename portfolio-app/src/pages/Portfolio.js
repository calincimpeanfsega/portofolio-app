import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'; 

function Portfolio() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/work')
      .then(response => setWorks(response.data))
      .catch(error => console.error('Error fetching works:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/work/${id}`)
      .then(() => {
        setWorks(works.filter(work => work.id !== id));
      })
      .catch(error => console.error('Error deleting work:', error));
  };

  const toggleVisibility = (id, currentStatus) => {
    const newStatus = currentStatus === 'afișat' ? 'ascuns' : 'afișat';
    axios.put(`http://localhost:3001/work/${id}`, { status: newStatus })
      .then(() => {
        setWorks(works.map(work =>
          work.id === id ? { ...work, status: newStatus } : work
        ));
      })
      .catch(error => console.error('Error updating visibility:', error));
  };

  return (
    <Container>
      <Grid container spacing={4} mt={4}>
        {works.map(work => (
          <Grid item key={work.id} xs={12} sm={6} md={4}>
            <Card
              style={{
                backgroundColor: work.status === 'ascuns' ? '#f0f0f0' : 'transparent',
                opacity: work.status === 'ascuns' ? 0.2 : 1,
                position: 'relative'
              }}
            >
              <a href={work.clientLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3001${work.image}`} // Adjust if necessary
                  alt={work.title}
                  style={{
                    opacity: work.status === 'ascuns' ? 0.1 : 1,
                  }}
                />
              </a>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {work.title}
                </Typography>
                <Typography variant="body2">
                  {work.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/edit/${work.id}`}
                  style={{ marginTop: '10px' }}
                >
                  Edit
                </Button>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(work.id)}
                  style={{ marginLeft: '10px' }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => toggleVisibility(work.id, work.status)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    opacity: 1, 
                    zIndex: 10,
                    color: "primary",
                  }}
                >
                  {work.status === 'ascuns' ? <VisibilityOffOutlinedIcon /> : <VisibilityIcon />}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Portfolio;
