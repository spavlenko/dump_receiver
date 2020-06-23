package main

import (
	"dump_reciever/controllers"
	"dump_reciever/db"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net/http"
)

func main() {

	dataStorage := db.InitDB("storage.db")
	db.Migrate(dataStorage)

	e := echo.New()
	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	// Root route => handler
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!\n")
	})

	e.POST("api/v1/register", controllers.RegisterEvent(dataStorage))
	e.GET("api/v1/events", controllers.GetRegisteredEvents(dataStorage))

	// Run Server
	e.Logger.Fatal(e.Start(":8000"))
}
