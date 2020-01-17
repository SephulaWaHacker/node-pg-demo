"use strict"

require("dotenv").config();

const { Client } = require("pg");

let client = new Client()
client.connect()



const addThings  = async() =>{
	let text, values, query;
	text = `INSERT INTO 
				some_table(
					str_col,
					int_col,
					bool_col) 
				VALUES($1,$2, $3) 
				RETURNING *`
	values = ['hello world', 123456, true]
	
	try {
		query = await client.query(text,values)
		console.log(query.rows)
		await client.end()
	} catch(e) {
		console.log(e);
		await client.end()
	}
}
// addThings()

const createTable = async () =>{
	
	try {
		const query = await client.query(
			`CREATE TABLE IF NOT EXISTS 
				some_table(
					str_col VARCHAR(64),
					int_col INTEGER,
					bool_col BOOLEAN);`
		)
		console.log(query)
		await client.end()
	} catch(e) {
		console.log(e);
		await client.end()
	}
}
// createTable()