import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: 32,
  lng: 20
};


const locations = [
  { name: 'United States', lat: 37.0902, lng: -95.7129 },
  { name: 'Europe', lat: 54.5260, lng: 15.2551 },
  { name: 'Asia', lat: 34.0479, lng: 100.6197 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 }
];

function MarketWatch() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    fetch('/api/maps/config')
      .then(response => response.json())
      .then(data => setApiKey(data.apiKey))
      .catch(error => {
        console.error("Error fetching Google Maps API key:", error);
        setError('Error loading Google Maps!'); // Set error state with a message
      });
  }, []);

  return (
    <>
      {error ? (
        <p>{error}</p> // Display error message if there is an error
      ) : apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
            {locations.map((location, index) => (
              <Marker key={index} position={location} title={location.name} />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading map...</p>
      )}
    </>
  );
}

export default MarketWatch;
