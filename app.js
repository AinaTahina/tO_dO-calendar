var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine
app.set('view engine', 'ejs')


// test
app.get('/list' , (req ,res) => {
	let tasks = require('./public/MySQL_storage')
	tasks.show_table( (results) => {
		for (let result of results){
			console.log(result.Tables_in_calendar)
		}
		res.send(results)
	})
})

app.get('/empty' , (req ,res) => {
	let tasks = require('./public/MySQL_storage')
	tasks.del_empty_table('28_4_2022')
	res.send()
})

// ROUTES
app.get('/', (req,res) => {
	res.render('index')
})

app.post('/' , (req,res) => {
	console.log(req.body)
	let tasks = require('./public/MySQL_storage')
	if (req.body.date) tasks.new_table(req.body.date)
	//console.log(req.body)
	res.redirect('/')
})

app.listen(8080)