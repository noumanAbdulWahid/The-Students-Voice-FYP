const mongoose = require('mongoose');
require('dotenv').config();

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.URL); 
        console.log('Mongo connection created');
    }catch (error){
        console.log('Error!! on creating connection with Mongo\n' , error);
    }
}