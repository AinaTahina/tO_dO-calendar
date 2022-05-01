
let mysql = require('mysql');

let connection =  mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'calendar'
})


connection.connect((err) => {
	if (err) throw err
	console.log('mysql connected')
})


module.exports = class tasks{

	static empty_table(cb){
		connection.query(
			`SELECT * FROM 28_4_2022` , (err , results) =>{
			if (err) throw err
			cb(results)
		})
	}

	static new_table(table_name){
		connection.query(
			`CREATE TABLE IF NOT EXISTS ${table_name} (tasks VARCHAR(255) NOT NULL)` , (err , results) =>{
			if (err) throw err
			console.log('Table created !!')
		})
	}

	static del_empty_table(table_name){
		connection.query(
			`SELECT * FROM ${table_name}` , (err , results) =>{
			if (err) throw err
			if (!results[0]) {
				connection.query(
					`DROP TABLE ${table_name}` , (err2 , results2) =>{
					if (err2) throw err2
					console.log('Empty table deleted !!')
				})
			}
			else console.log('Table not empty !')
		})
	}

	static show_table(cb){
		connection.query(
			`SHOW tables`, (err , results) =>{
			if (err) throw err
			console.log('Table showed !!')
			cb(results)
		})
	}

	static all_tasks(cb){
		connection.query(
			"SELECT * FROM task WHERE 1" ,(err , results) =>{
			if (err) throw err
			cb(results)
		})
	}

	static add_tasks(content){
		connection.query(
			`INSERT INTO task(content) VALUES ("${content}")`,(err , results) =>{
			if (err) throw err
			console.log('[+] add done !')
		})
	}

	static del_tasks(content){
		connection.query(
			`DELETE FROM task WHERE content=${content};`, (err , results) =>{
			if (err) throw err
			console.log('[-] delete done !')
		})
	}

	static clear_tasks(){
		connection.query(
			`DELETE FROM task`, (err , results) =>{
			if (err) throw err
			console.log('[ ] delet all done !')
		})
	}
}
