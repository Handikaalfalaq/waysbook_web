package routes

import (
	"waysbook/handlers"
	mysql "waysbook/pkg/database"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

func CartRouter(e *echo.Group) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	e.POST("/cart", h.CreateNewCart)
	e.GET("/carts/:id", h.GetAllCart)
	e.DELETE("/cart/:id", h.DeleteDataCart)
	e.DELETE("/carts/:user_id", h.DeleteAllCartsByUserID)

}
