
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins with proper configuration
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET'], // Only allow GET methods
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: false, // Don't send cookies
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

app.use(express.json());

// ✅ Root route to confirm server is running
app.get('/', (req, res) => {
  res.json({
    message: 'SpyFu Proxy Server is running!',
    status: 'OK',
    endpoints: {
      spyfu: '/proxy/spyfu?domain=example.com'
    }
  });
});

// ✅ SpyFu Proxy API Route
app.get('/proxy/spyfu', async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  const username = process.env.SPYFU_API_USERNAME || 'bd5d70b5-7793-4c6e-b012-2a62616bf1af';
  const apiKey = process.env.SPYFU_API_KEY || 'VESAPD8P';

  const url = `https://www.spyfu.com/apis/domain_stats_api/v2/getDomainStatsForExactDate?domain=${domain}&month=3&year=2023&countryCode=US&api_username=${username}&api_key=${apiKey}`;

  try {
    console.log(`Making request to: ${url}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log('SpyFu API response received');
    
    // Add CORS headers explicitly in the response
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    
    res.json(data);
  } catch (error) {
    console.error('SpyFu API Request Failed:', error.message);
    res.status(500).json({ error: 'SpyFu API request failed', details: error.message });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
