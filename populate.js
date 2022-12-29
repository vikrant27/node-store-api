const dotenv = require('dotenv')

// Load Config
dotenv.config({ path:'./config/.env'})

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts =  require('./products.json')

connectDB();

const start = async ()=>{
    try {
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('successsss')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()