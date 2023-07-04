package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	resultdto "waysbook/dto/result"
	transactiondto "waysbook/dto/transaction"
	"waysbook/models"
	"waysbook/repositories"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"

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

	total, _ := strconv.Atoi(c.FormValue("total"))

	transaction := models.Transaction{
		IdUser: userIdstr,
		Status: c.FormValue("status"),
		Total:  total,
	}

	fmt.Println("transactionatas", transaction)
	fmt.Println("transactionatas iduser", transaction.IdUser)
	fmt.Println("transactionatas status", transaction.Status)
	fmt.Println("transactionatas total", transaction.Total)

	validation := validator.New()
	err := validation.Struct(transaction)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	transactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	fmt.Println("transactionbawah", transactions)
	fmt.Println("transactionbawah", transactions.User)

	id := strconv.Itoa(transactions.Id)

	var s = snap.Client{}
	s.New("SB-Mid-server-Lh7pYQxeOdq0rBg4a-7uhX5Q", midtrans.Sandbox)
	// s.New("SB-Mid-server-Lh7pYQxeOdq0rBg4a-7uhX5Q", midtrans.Sandbox)

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  id,
			GrossAmt: int64(transactions.Total),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transactions.User.FullName,
			Email: transactions.User.Email,
		},
	}

	fmt.Println("req", req)
	fmt.Println("s aja", s)

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	fmt.Println("ini token", snapResp)

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: snapResp})

	// return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(id)})
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

func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderId)

	// transaction, _ := h.TransactionRepository.FindTransactionId(order_id)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransaction("pending", order_id)
		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}
	return c.JSON(http.StatusOK, resultdto.SuccessResult{
		Code: http.StatusOK, Data: notificationPayload,
	})
}

func convertResponseTransaction(id int) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		Id: id,
	}
}
