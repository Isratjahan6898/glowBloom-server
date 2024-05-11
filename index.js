const express =require('express')
const cors =require('cors')
require('dotenv').config()
const port = process.env.PORT||9000

const app = express()

const corsOption ={
    origin:['http://localhost:5173'],
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOption))
app.use(express.json())


app.get('/', (req,res)=>{
    res.send('glowBloom server is running')
})

app.listen(port, ()=>console.log(`server is running on port ${port}`))