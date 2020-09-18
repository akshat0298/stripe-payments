const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51HSi9eDppWGQrRcKoQzkhDG3XjPsK6zb2wKzrFD3ddPu1f49liCykhPks3zZH0VBwZ3G55wgo4yiOUE3aR5KsjY300CaW3U7hm'
var Secret_Key = 'sk_test_51HSi9eDppWGQrRcKNQAyT2F3ayGYJhwzGyQqXecjVsv4JODgqzOPZszXrDtMCE5fI2l1in8vBdYa64HGKa2b8uSk003da1jvrg'

const stripe = require('stripe')(Secret_Key) 

const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
    res.render('Home', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Gautam Sharma', 
        address: { 
            line1: '200 Lafayette Ave', 
            postal_code: ' 21030', 
            city: 'Cockeysville', 
            state: 'MD', 
            country: 'US', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 7000,    // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'USD', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 

app.listen(port, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
})