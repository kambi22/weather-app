'use client'
import { Alert, AlertTitle, Box, Container, Grid } from '@mui/material';
import Searchbar from '../../component/Searchbar';
import axios from 'axios';
import { FaTemperatureFull, FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { LuCloud, LuCloudLightning, LuCloudRain, LuCloudSun, LuShowerHead, LuSnowflake, LuSun } from "react-icons/lu"; // Added more specific icons
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const Home = () => {
  const [weatherData, setWeatherData] = useState([]); // Renamed for clarity: holds fetched weather objects
  const [error, setError] = useState(null); // Renamed for consistency
  const [loading, setLoading] = useState(true); // Added loading state

  // This selector should provide the list of city names to fetch
  const citiesToFetch = useSelector((state) => state.locations.locations);

  useEffect(() => {
    const fetchWeatherData = async () => {
      // If there are no cities to fetch, clear data and stop loading
      if (citiesToFetch.length === 0) {
        setWeatherData([]);
        setLoading(false);
        return;
      }

      setLoading(true); // Start loading
      setError(null); // Clear any previous errors

      try {
        const fetchPromises = citiesToFetch.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`)
        );
        const responses = await Promise.all(fetchPromises);
       
        setWeatherData(responses.map(response => response.data));
        setLoading(false); // End loading

      } catch (err) {
        const errorMessage = err?.response?.data?.message || err.message || 'Error: Failed to fetch city data';
        console.error('Error fetching multiple cities:', err);
        setError(errorMessage);
        setLoading(false); // End loading even on error
      }
    };

    fetchWeatherData();

  }, [citiesToFetch]); // Dependency array now correctly depends on the list of cities from Redux

  // Helper function to get weather icon based on main weather condition
  const getWeatherIcon = (mainCondition) => {
    switch (mainCondition) {
      case 'Clouds':
        return <LuCloud size={50} className='text-gray-500' />;
      case 'Clear':
        return <LuSun size={50} className='text-yellow-500' />;
      case 'Rain':
      case 'Drizzle':
        return <LuCloudRain size={50} className='text-blue-500' />;
      case 'Snow':
        return <LuSnowflake size={50} className='text-blue-300' />;
      case 'Thunderstorm':
        return <LuCloudLightning size={50} className='text-gray-700' />;
      default:
        return <LuCloudSun size={50} className='text-gray-500' />; // Default for other conditions
    }
  };


  return (
    <div className="">
      {error &&
        <Alert className=' text-center ms-5' severity="error" sx={{ position: 'absolute', top: '50px', right: '20px' }}>
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      }
      <Container>
        <div
          className="bg-white/30 shadow-2xl rounded-2xl w-full backdrop-blur-lg border border-white/30 p-8 mx-auto mt-7"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            marginBottom: '100px'
          }}
        >
          <div className="mt-5">
            <Searchbar className='mt-5' />
          </div>



          <Box sx={{ mt: '50px', mb: '50px' }}>
            <Grid container spacing={3}>
            {loading ? (
              <div className="flex justify-center mx-auto  mt-5 h-70">
                <div className="animate-spin rounded-full h-13 w-13 border-b-2 border-t-2 border-b-blue-500 border-t-white"></div>
              </div>
            ) : weatherData.length > 0 ? (
                weatherData.map((weather) => (
                  <Grid item key={weather.name} size={{ xl: 4, md: 4, sm: 6, xs: 12 }}> {/* Corrected Grid prop syntax for responsiveness */}
                    <div
                      className="bg-white/30 shadow-2xl rounded-2xl h-80 backdrop-blur-lg border border-white/30 p-6 flex flex-col"
                    >
                      <div className="text-start flex gap-2">
                        <h2 className="text-xl  text-gray-600">{weather.name}</h2>
                        {/* <Chip className="text-lg text-white bg-blue-200" sx={{ backgroundColor: "#89cff0", color: 'white' }} label={weather.sys.country}></Chip> */}
                      </div>
                      <div className=" mx-auto items-center " style={{ marginTop: '50px' }}>
                        <div className="flex">
                          <p className="text-5xl font-semibold">{Math.round(weather.main.temp)}°</p>
                          {/* Use the helper function for weather icons */}
                          {weather.weather && weather.weather.length > 0 && getWeatherIcon(weather.weather[0].main)}
                        </div>
                        <p className="capitalize">{weather.weather[0].description}</p>
                      </div>

                      <div className="flex mt-8 gap-2 ">
                        <div className="flex flex-col gap-0.5 justify-center items-center rounded-2xl shadow h-20 w-full">
                          {/* Conditional logic for "Feels Like" temperature icon remains */}
                          {weather.main.feels_like >= 30 ? (
                            <FaTemperatureFull className='text-red-600' size={18} />
                          ) : weather.main.feels_like >= 20 ? (
                            <FaTemperatureFull className='text-yellow-600' size={18} />
                          ) : (
                            <FaTemperatureFull className='text-blue-400' size={18} />
                          )}
                          <p>Feels Like</p>
                        </div>
                        <div className="flex flex-col gap-0.5 justify-center items-center rounded-2xl shadow h-20 w-full">
                          <WiHumidity className='text-blue-500' size={25} />
                          <p>Humidity</p>
                        </div>
                        <div className="flex flex-col gap-0.5 justify-center items-center rounded-2xl shadow h-20 w-full">
                          <FaWind size={17} className='text-green-800' />
                          <p>Wind</p>
                        </div>
                      </div>

                    </div>
                  </Grid>
                ))
              ) : (
                // Display message when no data and not loading/error
                !loading && !error && <p>No weather data available. Please add a city.</p>
              )}
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
};
export default Home;
