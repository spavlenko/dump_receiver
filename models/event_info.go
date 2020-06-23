package models

import (
	"database/sql"
	"dump_reciever/types"
)

func RegisterEventInfo(db *sql.DB, info types.EventInfo) (int64, error) {
	sqlQuery := "INSERT INTO Events(product_name,product_version,executable_name," +
		"event_type,exception_code,exception_description,failure_file,failure_func," +
		"failure_line,expression,message,os_name,user_name,computer_name,client_id," +
		"stack_trace,timestamp) VALUES( $1, $2, $3, $4, $5, $6," +
		"$7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)"

	stmt, err := db.Prepare(sqlQuery)

	if err != nil {
		panic(err)
	}

	defer stmt.Close()

	result, err2 := stmt.Exec(info.ApplicationInfo.ProductName, info.ApplicationInfo.ProductVersion,
		info.EventInfo.ExecutableName, info.EventInfo.EventType, info.EventInfo.ExceptionCode,
		info.EventInfo.ExceptionDescr, info.EventInfo.FailureFile,
		info.EventInfo.FailureFunc, info.EventInfo.FailureLine, info.EventInfo.Expression,
		info.EventInfo.Message, info.OsName, info.UserName, info.ComputerName, info.UserId,
		info.EventInfo.StackTrace, info.EventInfo.EventTimeUnix)

	if err2 != nil {
		panic(err2)
	}

	return result.LastInsertId()
}

func GetRegisteredEvents(db *sql.DB) types.EventsCollection {
	sqlQuery := "SELECT * FROM Events"
	rows, err := db.Query(sqlQuery)

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	result := types.EventsCollection{}
	for rows.Next() {
		event := types.EventInfo{}
		err2 := rows.Scan(&event.ID, &event.ApplicationInfo.ProductName, &event.ApplicationInfo.ProductVersion,
			&event.EventInfo.ExecutableName, &event.EventInfo.EventType, &event.EventInfo.ExceptionCode,
			&event.EventInfo.ExceptionDescr, &event.EventInfo.FailureFile,
			&event.EventInfo.FailureFunc, &event.EventInfo.FailureLine, &event.EventInfo.Expression,
			&event.EventInfo.Message, &event.OsName, &event.UserName, &event.ComputerName, &event.UserId,
			&event.EventInfo.StackTrace, &event.EventInfo.EventTimeUnix)

		if err2 != nil {
			panic(err2)
		}
		result.Events = append(result.Events, event)
	}
	return result
}
