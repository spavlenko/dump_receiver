package controllers

import (
	"bytes"
	"database/sql"
	"dump_reciever/models"
	"dump_reciever/types"
	"fmt"
	"github.com/labstack/echo"
	"io/ioutil"
	"net/http"
)

func RegisterEvent(database *sql.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		var bodyBytes []byte
		if c.Request().Body != nil {
			bodyBytes, _ = ioutil.ReadAll(c.Request().Body)
		}
		// Restore the io.ReadCloser to its original state
		c.Request().Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))
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
