require('express-async-errors')
const dotenv = require('dotenv')
const express = require('express');
const products = require('./routes/products');
const mainRouter = require('./routes/main');
const connectDB = require('./db/connect')

const app = express();

// Load Config
dotenv.config({ path:'./config/.env'})

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'))
app.use(express.json());

//routes

// app.get('/',(req,res)=>{
//     res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
// })

app.use('/api/v1/products/',products)
app.use('/api/v1/',mainRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async() => {
    try {
        //connectDB
        //connectDB()
        app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()