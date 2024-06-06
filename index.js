require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');



const UserRoutes = require('./Router/UserRoutes');

const DriverRoutes =require('./Router/DriverRoutes')
const Login =require('./Router/loginRoute')

const OrderRoutes = require('./Router/OrderRoutes');
const RequestRoutes = require('./Router/RequestRoutes');



const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
app.use(bodyParser.json());


app.use('/user', UserRoutes);
app.use('/Vehicle',DriverRoutes)
app.use('/loginRoute',Login)
app.use('/order', OrderRoutes);
app.use('/request', RequestRoutes);


const URL = process.env.MONGODB_URL;



mongoose.connect(URL, {})
    .then(() => {
        console.log('mongodb connected');
    })
    .catch(err => {
        console.error('error connect', err);
    });


    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });

    
