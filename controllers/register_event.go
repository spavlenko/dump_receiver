package controllers

import (
	"bytes"
	"dump_reciever/types"
	"encoding/json"
	"fmt"
	"github.com/labstack/echo"
	"io/ioutil"
	"net/http"
)

func RegisterEvent(c echo.Context) (err error) {
	var bodyBytes []byte
	if c.Request().Body != nil {

		bodyBytes, _ = ioutil.ReadAll(c.Request().Body)
	}
	// Restore the io.ReadCloser to its original state
	c.Request().Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))
	eventInfo := new(types.EventInfo)
	er := c.Bind(eventInfo) // bind the structure with the context body
	// or no panic!
	if er != nil {
		panic(er)
	}

	b, err := json.Marshal(eventInfo)
	if err != nil {
		fmt.Println(err)
		return
	}

	return c.JSON(http.StatusOK, string(b))
}
