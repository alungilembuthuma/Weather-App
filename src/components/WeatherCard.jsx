import React, { useEffect, useRef, useState } from 'react';
import Navigation from './navigation';


const WeatherCard = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const search = async (city) => {
    if (city === '') {
      alert("Enter City Name");
      return;
    }
    try {
      const apiKey = '8393b865d86a21875935541b6fa5fafb'; // Use API key
      if (!apiKey) {
        throw new Error('API key is not defined');
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        const data = await response.json();
        if (data.message === 'city not found') {
          alert("Please add city name");
        } else {
          alert("Error fetching data. Please try again.");
        }
        return;
      }
      const data = await response.json();

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
      });
    } catch (error) {
      setError("Error fetching the data. Please try again.");
      console.error("Error fetching the data", error);
    }
  };

  useEffect(() => {
    search('Durban');
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!weatherData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className='weather' style={{ backgroundImage:"url(https://th.bing.com/th/id/OIP.2fuYWeeojtBQlMGsLAy5ygHaFj?rs=1&pid=ImgDetMain.jpg)",backgroundRepeat:"no-repeat",backgroundSize:"100vw", width:"100vw", height:"100vh", marginTop:"-3%"}} >
        <Navigation/>
        <h1 style={{marginLeft:"35%",}}>Today's Weather</h1>
        
        <h2 className='location' style={{marginLeft:"45%",}}>{weatherData.location}</h2>
        <input ref={inputRef} type='text' placeholder='Search' style={{width:"300px", height:"30px", borderRadius:"5%", marginLeft:"70%", marginTop:"-5%"}} />
        <div style={{backgroundColor:"rgb(69,116,222, 0.8)", marginTop:"7vh", width:"50vw", height:"55vh", marginLeft:"25%"}}>
          {weatherData && (
            <div>
              <h4 style={{fontSize:"30px", color:"white"}}>Temperature</h4>
              <p className='temperature' style={{fontSize:"20px", color:"white"}}>{weatherData.temperature}°C</p>
              <h4 style={{fontSize:"30px", color:"white"}}>Humidity</h4>
              <p style={{fontSize:"20px", color:"white"}}>{weatherData.humidity} %</p>
              <h4 style={{fontSize:"30px", color:"white"}}>Wind Speed</h4>
              <p style={{fontSize:"20px", color:"white"}}>{weatherData.windSpeed} Km/h</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherCard;