const express = require('express')
const path = require('path')
const app = express()
const hbs =require('hbs')
const geocode =require("./utils/geocode")
const forecast = require("./utils/forecast")
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

//setup paths for handlebars engine and location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)



app.get('',(req,res)=>{
    res.render('index',{
        name : 'weather',
        created :'Bharathi',
        title:'weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:"about",
        title:'about',
        created:'Bharathi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help',
        created : 'Bharathi'
    })
})


// app.get('',(req,res)=>{
//     res.send("this is home page")
// })

// app.get('/help',(req,res)=>{
//     res.send("this is help page")
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about page<h1>')
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'please provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, data) => {
            if(error){
                return res.send({error})
            }
            else{
            res.send({
                forecast : data,
                location,
                address: req.query.address

            })
          }})
        
    
    })
    // res.send({
    //     foreast : 'its snowing',
    //     location : req.query.address
    // })
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
         return res.send({
            error : 'please provide item to search'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        created:"Bharathi",
        errorMessage:'This article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        created:"Bharathi",
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log("server is up and running")
})