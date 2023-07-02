package handlers

import (
	"net/http"
	"strconv"
	cartdto "waysbook/dto/cart"
	resultdto "waysbook/dto/result"
	"waysbook/models"
	"waysbook/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// var downloadFile = "http://localhost:5000/uploads/"

type handlerCart struct {
	CartRepository repositories.CartRepository
}

func HandlerCart(CartRepository repositories.CartRepository) *handlerCart {
	return &handlerCart{CartRepository}
}

func (h *handlerCart) CreateNewCart(c echo.Context) error {
	
	idUser, _ := strconv.Atoi(c.FormValue("idUser"))
	idBook, _ := strconv.Atoi(c.FormValue("idBook"))

	cart := models.Cart{
		IdUser: idUser,
		IdBook: idBook,
	}

	validation := validator.New()
	err := validation.Struct(cart)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	data, err := h.CartRepository.CreateCart(cart)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseCart(data)})
}

func (h *handlerCart) GetAllCart(c echo.Context) error {
	userID := c.Param("id")

	carts, err := h.CartRepository.FindCarts(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: carts})
}

func (h *handlerCart) DeleteDataCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.CartRepository.DeleteCart(cart, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseCart(data)})
}

func (h *handlerCart) DeleteAllCartsByUserID(c echo.Context) error {
	userID := c.Param("user_id")

	carts, err := h.CartRepository.FindCarts(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	err = h.CartRepository.DeleteCartByUserID(carts)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK})
}

func convertResponseCart(u models.Cart) cartdto.CartResponse {
	return cartdto.CartResponse{
		Id:     u.Id,
		IdUser: u.IdUser,
		IdBook: u.IdBook,
	}
}
