package handlers

import (
	"net/http"
	"strconv"
	resultdto "waysbook/dto/result"
	transactiondto "waysbook/dto/transaction"
	"waysbook/models"
	"waysbook/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) CreateNewTransaction(c echo.Context) error {
	userId := c.Param("idUser")
	userIdstr, _ := strconv.Atoi(userId)

	transaction := models.Transaction{
		IdUser: userIdstr,
	}

	validation := validator.New()
	err := validation.Struct(transaction)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	id, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(id)})
}

// GetTransactionByIdUser
func (h *handlerTransaction) GetTransactionByIdUser(c echo.Context) error {
	userId := c.Param("idUser")
	userIdstr, _ := strconv.Atoi(userId)

	transactions, err := h.TransactionRepository.FindTransactionsByIdUser(userIdstr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: transactions})
}

func (h *handlerTransaction) GetAllTransaction(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindAllTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: transactions})
}

func convertResponseTransaction(id int) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		Id: id,
	}
}
