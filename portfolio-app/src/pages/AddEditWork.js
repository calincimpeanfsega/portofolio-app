import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

function AddEditWork() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientLink, setClientLink] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/work/${id}`)
        .then(response => {
          const { title, description, clientLink, image } = response.data;
          setTitle(title);
          setDescription(description);
          setClientLink(clientLink);
          setExistingImage(`http://localhost:3001${image}`);
        })
        .catch(error => console.error('Error fetching work:', error));
    }
  }, [id]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('clientLink', clientLink);
    if (image) formData.append('image', image);

    const request = id 
      ? axios.put(`http://localhost:3001/work/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      : axios.post('http://localhost:3001/work', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    request
      .then(() => navigate('/portfolio'))
      .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <Container>
      <h2>{id ? 'Edit Work' : 'Add New Work'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Client Link"
          value={clientLink}
          onChange={(e) => setClientLink(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '20px' }}
        />
        {image && (
          <div style={{ marginTop: '20px' }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
        )}
        {existingImage && !image && !id && (
          <div style={{ marginTop: '20px' }}>
            <img
              src={existingImage}
              alt="Existing"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          {id ? 'Update Work' : 'Add Work'}
        </Button>
      </form>
    </Container>
  );
}

export default AddEditWork;
