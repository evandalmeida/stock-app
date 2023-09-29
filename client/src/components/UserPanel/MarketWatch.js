import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px',
  borderRadius: '5px'
};

const center = {
  lat: 32,
  lng: 20
};

const indexFunds = {
  'United States': {
    name: 'S&P 500',
    ticker: 'SPY' 
  },
  'Europe': {
   name: 'Euro Stoxx 50',
   ticker: 'STOXX50'
  },
  'Asia': {
   name: 'Nikkei 225',  
   ticker: 'NIKKEI225'
  },
  'Australia': {
    name: 'S&P/ASX 200',
    ticker: 'ASX200'
  },
  'Canada': {
    name: 'S&P/TSX Composite',
    ticker: 'TSX'
  }
};

const locations = [
  { name: 'United States', 
    lat: 30.0902, 
    lng: -95.7129 
  },
  { name: 'Europe',
    lat: 54.5260,
    lng: 15.2551
  },
  { name: 'Asia',
    lat: 34.0479, 
    lng: 100.6197
  },
  { name: 'Australia',
    lat: -30.2744,
    lng: 133.7751 
  },
  { name: 'Canada', 
    lat: 50.1304, 
    lng: -106.3468
  }
];


export default function MarketWatch() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/maps/config')
      .then(response => response.json())
      .then(data => setApiKey(data.apiKey))
      .catch(error => {
        console.error("Error fetching Google Maps API key:", error);
        setError('Error loading Google Maps!');
      });
  }, []);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
            {locations.map((location, index) => {
              // Example condition: Generate a random boolean to determine pin color
              const isRedPin = Math.random() < 0.5;

              return (
                <Marker
                  key={index}
                  position={location}
                  title={location.name}
                  icon={{
                    url: isRedPin
                      ? 'https://www.freeiconspng.com/uploads/red-spot-light-png-6.png'
                      : 'https://freepngimg.com/save/34148-green-light-transparent-image/980x725',
                    scaledSize: { width: 100, height: 100 }
                  }}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading map...</p>
      )}
    </>
  );
}