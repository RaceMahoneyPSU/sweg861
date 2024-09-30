const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./middlewares/passport-config'); 
const User = require('./models/User'); 
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Use auth routes
app.use('/auth', authRoutes);

// Use form routes
app.use('/api', formRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));