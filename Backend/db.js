const mongoose=require('mongoose')
const mongoURI='mongodb+srv://sobhrajas77:hJznUMu1hWM4gze2@cluster0.jsww8ko.mongodb.net/iNotebook?retryWrites=true&w=majority&appName=Cluster0'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>console.log("connected to mongoose")).catch((e)=>console.log(e.message))
}

module.exports=connectToMongo