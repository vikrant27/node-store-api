const Product = require('../models/product');

const getAllProductStatic = async (req,res) =>{

    const products = await Product.find({}).sort('name');
    //throw new Error('testing async error')
    res.status(200).json({message:'products testing route', products,nbhits: products.length})
}

const getAllProducts = async (req,res) =>{

    const { featured, company,name, sort, fields, numericFilters } = req.query;
    //console.log(req.query);
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    
    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }

    // if(price){
    //     queryObject.price = {$gt:30}
    // }

    if(numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }

        const regEx = /\b(<|>|>=|=|<|<=)\b/g

        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)

        const options = ['price','rating'];

        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
    }

    //console.log(queryObject)
    let result =  Product.find(queryObject);
    
    if(sort){
        const sortlist = sort.split(',').join(' ');
        result = result.sort(sortlist)
    }else{
        result = result.sort('createdAt')
    }


    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;
    //console.log(result);
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({message:'products route',products:products, nbhits:products.length})
}

module.exports = {getAllProducts,getAllProductStatic}