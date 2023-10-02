import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '55vw',
  height: '60vh',
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
  {
    name: 'United States',
    lat: 23.0902,
    lng: -100.7129,
    symbol: indexFunds['United States'].ticker
  },
  {
    name: 'Europe',
    lat: 34.5260,
    lng: 15.2551,
    symbol: indexFunds['Europe'].ticker
  },
  {
    name: 'Asia',
    lat: 25.0479,
    lng: 100.6197,
    symbol: indexFunds['Asia'].ticker
  },
  {
    name: 'Australia',
    lat: -43.2744,
    lng: 133.7751,
    symbol: indexFunds['Australia'].ticker
  },
  {
    name: 'Canada',
    lat: 47.1304,
    lng: -106.3468,
    symbol: indexFunds['Canada'].ticker
  }
];

export default function MarketWatch() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch('/api/maps/config')
      .then((response) => response.json())
      .then((data) => setApiKey(data.apiKey))
      .catch((error) => {
        console.error('Error fetching Google Maps API key:', error);
        setError('Error loading Google Maps!');
      });
  }, []);

  useEffect(() => {
    // Fetch today's date
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate()
    ).padStart(2, '0')}`;

    // Fetch stock price data for the last open business day
    const fetchData = async () => {
      const updatedStockData = await Promise.all(
        locations.map(async (location) => {
          try {
            const ticker = yf.Ticker(location.symbol);
            const historicalData = await ticker.history({
              period: '1d',
              start: formattedDate, // Use today's date as the start date
            });

            const yesterdayClose = historicalData.iloc[0].Close;
            const todayClose = historicalData.iloc[1].Close;
            const priceChange = todayClose - yesterdayClose;

            return {
              ...location,
              priceChange,
            };
          } catch (error) {
            console.error('Error fetching stock data:', error);
            return location;
          }
        })
      );

      setStockData(updatedStockData);
    };

    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={1.7} className="map">
            {stockData.map((location, index) => {
         
              const isRedPin = location.priceChange < 0;

              return (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.name}
                  icon={{
                    url: isRedPin
                      ? 'https://www.freeiconspng.com/uploads/red-spot-light-png-6.png'
                      : 'https://freepngimg.com/save/34148-green-light-transparent-image/980x725',
                    scaledSize: { width: 100, height: 95 },
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
