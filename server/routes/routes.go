package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	AutRoutes(e)
	UserRoutes(e)
	BookRouter(e)
	CartRouter(e)
	TransactionRoutes(e)
}
