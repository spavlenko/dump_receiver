package db

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func InitDB(filepath string) *sql.DB {

	db, err := sql.Open("sqlite3", filepath)

	if err != nil {
		panic(err)
	}

	if db == nil {
		panic("unable to create database")
	}
	return db
}

func Migrate(db *sql.DB) {
	sql := `
    CREATE TABLE IF NOT EXISTS Events(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        product_name 	VARCHAR NOT NULL,
        product_version VARCHAR NOT NULL,
        executable_name 	VARCHAR NOT NULL,
        event_type 		VARCHAR NOT NULL,
        exception_code 	INTEGER NOT NULL,
        exception_description VARCHAR,
        failure_file 	VARCHAR,
        failure_func 	VARCHAR,
        failure_line 	INTEGER,
        expression 		VARCHAR,
        message		 	VARCHAR,
        os_name			VARCHAR,
        user_name		VARCHAR,
        computer_name	VARCHAR,
        client_id		VARCHAR,
        stack_trace		VARCHAR,
        timestamp 		VARCHAR NOT NULL
        
    );
    `
	_, err := db.Exec(sql)

	if err != nil {
		panic(err)
	}
}
