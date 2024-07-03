const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.set('trust proxy', true);

const port = process.env.PORT || 3000;
const weatherApiKey = process.env.WEATHER_API_KEY;
const defaultClientIp = process.env.DEFAULT_CLIENT_IP;


app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = req.ip !== '::1' ? req.ip : defaultClientIp;

    try {
        const locationRes = await axios.get(`http://ip-api.com/json/${clientIp}`);
        const { city } = locationRes.data;
        
        if (!city) {
            throw new Error('Failed to fetch location');
        }

        // Fetch weather data based on location
        const weatherRes = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: weatherApiKey,
                units: 'metric'
            }
        });

        const temperature = weatherRes.data.main.temp;

        res.json({
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}.`
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location or weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});