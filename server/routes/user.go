package routes

import (
	"waysbook/handlers"
	mysql "waysbook/pkg/database"
	"waysbook/pkg/middleware"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.GetAllUser)
	e.GET("/user/:id", h.GetUserById)
	e.PATCH("/user/:id", middleware.UploadfotoProfile(h.UpdateDataUser))
	e.DELETE("/user/:id", h.DeleteDataUser)
}
