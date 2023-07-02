package routes

import (
	"waysbook/handlers"
	mysql "waysbook/pkg/database"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	TransactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(TransactionRepository)

	e.POST("/transaction/:idUser", h.CreateNewTransaction)
	e.GET("/transaction/:idUser", h.GetTransactionByIdUser)
	e.GET("/transactions", h.GetAllTransaction)
}
