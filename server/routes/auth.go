package routes

import (
	"waysbook/handlers"
	mysql "waysbook/pkg/database"
	"waysbook/pkg/middleware"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

func AutRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	// e.GET("/check-auth", h.CheckAuth)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))
}
