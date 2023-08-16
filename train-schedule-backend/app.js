const express = require('express');
const app = express();
const port = 3001; // Your desired port

// Middleware for parsing JSON requests
app.use(express.json());

// Sample train data (you would fetch this from the John Doe Railway Server)
const trains = [
  {
    trainName: "Chennai Exp",
    trainNumber: "2344",
    departureTime: {
      Hours: 21,
      Minutes: 35,
      Seconds: 0
    },
    seatsAvailable: {
      sleeper: 3,
      AC: 1
    },
    price: {
      sleeper: 2,
      AC: 5
    },
    delayedBy: 15
  },
  // Add more train objects here...
];

// Endpoint to get all trains
app.get('/trains', (req, res) => {
  // Filter and sort the trains based on your requirements
  const currentTime = new Date();
  const next12Hours = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
  
  const filteredTrains = trains.filter(train => {
    const departureTime = new Date();
    departureTime.setHours(train.departureTime.Hours);
    departureTime.setMinutes(train.departureTime.Minutes);
    departureTime.setSeconds(train.departureTime.Seconds);
    
    return departureTime > currentTime && departureTime <= next12Hours;
  });

  const sortedTrains = filteredTrains.sort((a, b) => {
    // Sort logic based on price, availability, and departure time
    // Implement your sorting logic here
  });

  res.json(sortedTrains);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
