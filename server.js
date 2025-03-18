
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Enable Express to trust proxies (for Railway)
app.set('trust proxy', 1);

// ✅ Apply CORS middleware globally with most permissive settings for debugging
app.use(cors({
  origin: '*',  // ✅ Allow all origins temporarily for debugging
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'Cache-Control', 'Pragma'],
  credentials: false,
  maxAge: 86400 // 24 hours
}));

// ✅ Add manual CORS headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, Cache-Control, Pragma");
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// ✅ Root Route for API Status
app.get('/', (req, res) => {
  res.json({
    message: 'SpyFu Proxy Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      spyfu: '/proxy/spyfu?domain=example.com',
      debug: '/debug-headers'
    }
  });
});

// ✅ Debugging Route to Check CORS
app.get('/cors-test', (req, res) => {
  res.json({
    success: true, 
    message: 'CORS is properly configured!',
    origin: req.headers.origin || 'No origin header',
    headers: req.headers
  });
});

// ✅ Debug headers route
app.get('/debug-headers', (req, res) => {
  res.json({
    headers: req.headers,
    message: "CORS Debugging - Headers Confirmed."
  });
});

// ✅ SpyFu Proxy API Route
app.get('/proxy/spyfu', async (req, res) => {
  const { domain } = req.query;

  if (!domain) {
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  // Get API credentials from environment variables with fallbacks
  const username = process.env.SPYFU_API_USERNAME || 'bd5d70b5-7793-4c6e-b012-2a62616bf1af';
  const apiKey = process.env.SPYFU_API_KEY || 'VESAPD8P';

  const url = `https://www.spyfu.com/apis/domain_stats_api/v2/getDomainStatsForExactDate?domain=${domain}&month=3&year=2023&countryCode=US&api_username=${username}&api_key=${apiKey}`;

  try {
    console.log(`Making request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 15000 // 15 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`SpyFu API returned status: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('SpyFu API response received successfully');
    
    res.json(data);
  } catch (error) {
    console.error('SpyFu API Request Failed:', error.message);
    
    res.status(500).json({ 
      error: 'SpyFu API request failed', 
      details: error.message,
      message: 'If you are seeing this from a browser client, please enter traffic data manually.'
    });
  }
});

// ✅ Handle Undefined Routes (Prevents "Not Found" Errors)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'This route does not exist' });
});

// ✅ Start the Server
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
