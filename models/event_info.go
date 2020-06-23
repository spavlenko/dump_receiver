package models

import (
	"database/sql"
	"dump_reciever/types"
)

func RegisterEventInfo(db *sql.DB, info types.EventInfo) (int64, error) {
	sql := "INSERT INTO Events(product_name,product_version,executable_name," +
		"event_type,exception_code,exception_description,failure_file,failure_func," +
		"failure_line,expression,message,os_name,user_name,computer_name,client_id," +
		"stack_trace,timestamp) VALUES( $1, $2, $3, $4, $5, $6," +
		"$7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)"

	stmt, err := db.Prepare(sql)

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
