const path    = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app  = express ()
const port = process.env.PORT || 3000

// app.com
// app.com/help
// app.com/about
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// handle bars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))



app.get('', (req,resp) => {
    resp.render('index', {
        title: 'Weather',
        name: 'Chabane'
    })
})

app.get('/about', (req,resp) => {
    resp.render('about', {
        title: 'About me',
        name: 'Chabane'
    })
})

app.get('/help', (req,resp) => {
    resp.render('help', {
        helpText: 'This is a useful help text',
        title: 'Help',
        name: 'Chabane'
    })
})

app.get('/weather', (req,resp) => {
    if (!req.query.address) {
        return resp.send( {
            error:'You must provide an addresss'
        })
    }
    geocode (req.query.address , (error,{latitude,longitude,location}={}) => {
        if (error) {
            return resp.send( {
                error:error
            })
        }
        forecast({latitude,longitude}, (error,forecast) => {
            if (error) {
                return resp.send( {
                    error:error
                })
            }
            resp.send({
                location,
                forecast:forecast,
                address:req.query.address
            })
        })
    })
})


app.get('/products', (req,resp) => {
    console.log(req.query)
    resp.send({
        forecast:'it is snowing',
        location:"Paris",
        title: 'Weather',
    })
})

app.get('/help/*', (req,resp) => {
    resp.render('404', {
        errormsg: 'Help article page not found',
        name: 'Chabane',
        title: 'Help',
    })
})

app.get('*', (req,resp) => {
    resp.render('404', {
        errormsg: 'Page not found',
        name: 'Chabane',
        title: '404',
    })
})

app.listen (port, () => {
    console.log('Server started on  ' + port )
})

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
})
