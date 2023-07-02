package routes

import (
	"waysbook/handlers"
	mysql "waysbook/pkg/database"
	"waysbook/pkg/middleware"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

func BookRouter(e *echo.Group) {
	bookRepository := repositories.RepositoryBook(mysql.DB)
	h := handlers.HandlerBook(bookRepository)

	e.POST("/book", middleware.UploadFile(h.CreateNewBook))
	e.GET("/books", h.GetAllBook)
	e.GET("/book/:id", h.GetBookById)
	e.PATCH("/book/:id", middleware.UploadFile(h.UpdateDataBook))
	e.DELETE("/book/:id", h.DeleteDataBook)
}
