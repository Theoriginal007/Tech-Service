require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


const MONGODB_URI = 'mongodb://127.0.0.1:27017/techServiceDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    service: {
        type: String,
        required: [true, 'Service is required'],
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    additionalDetails: String,
});

const Booking = mongoose.model('Booking', bookingSchema);


app.get('/', (req, res) => {
    res.send('<h1>Welcome to Tech Service Booking</h1>');
});

app.get('/services', (req, res) => {
    res.send('<h2>Our Tech Services</h2><p>We offer a variety of tech services including computer repair, software installation, and network setup.</p>');
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
});

app.get('/info', (req, res) => {
    res.json({
        status: 'Service Available',
        version: '1.0.0',
        description: 'This is a tech service booking application built with Express.js.',
    });
});

app.get('/book-service', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bookService.html'));
});

app.post('/submit-booking', async (req, res) => {
    try {
        const bookingData = new Booking(req.body);
        await bookingData.save();
        res.status(201).send('Booking submitted successfully!');
    } catch (error) {
        res.status(400).send('Error saving booking: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
