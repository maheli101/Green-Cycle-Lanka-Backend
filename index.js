require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const BuyerRoutes = require('./Router/BuyerRoutes');

const UserRoutes = require('./Router/UserRoutes');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use('/buyer', BuyerRoutes);
app.use('/user', UserRoutes);

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

    
