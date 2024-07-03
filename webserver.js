const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.set('trust proxy', true);
app.use(cors());

const port = process.env.PORT || 3000;
const weatherApiKey = process.env.WEATHER_API_KEY;


app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = '196.207.176.43';

    console.log(`Client IP: ${clientIp}`);

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