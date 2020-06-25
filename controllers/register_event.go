package controllers

import (
	"database/sql"
	"dump_reciever/models"
	"dump_reciever/types"
	"fmt"
	"github.com/labstack/echo"
	"net/http"
)

func RegisterEvent(database *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var eventInfo types.EventInfo
		er := c.Bind(&eventInfo) // bind the structure with the context body
		// or no panic!
		if er != nil {
			panic(er)
		}

		_, err := models.RegisterEventInfo(database, eventInfo)
		if err != nil {
			fmt.Println(err)
			return er
		}

		return c.JSON(http.StatusOK, "Added successfully")
	}
}

func GetRegisteredEvents(db *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, models.GetRegisteredEvents(db))
	}
}
