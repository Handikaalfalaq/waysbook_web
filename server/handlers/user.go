package handlers

import (
	"net/http"
	"strconv"
	dto "waysbook/dto/result"
	usersdto "waysbook/dto/user"
	"waysbook/models"
	"waysbook/repositories"

	"github.com/labstack/echo/v4"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) GetAllUser(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: users})
}

func (h *handlerUser) GetUserById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}

func (h *handlerUser) UpdateDataUser(c echo.Context) error {
	dataImageUpdate := c.Get("dataImageProfile").(string)

	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var fullName = c.FormValue("fullName")
	if fullName != "" {
		user.FullName = fullName
	}

	var gender = c.FormValue("gender")
	if gender != "" {
		user.Gender = gender
	}

	var phone = c.FormValue("phone")
	if phone != "" {
		user.Phone = phone
	}

	var address = c.FormValue("address")
	if address != "" {
		user.Address = address
	}

	var image = dataImageUpdate
	if image != "" {
		user.FotoProfile = image
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseUser(data)})
}

func (h *handlerUser) DeleteDataUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseUser(data)})
}

func convertResponseUser(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		Id:          u.Id,
		Email:       u.Email,
		Password:    u.Password,
		FullName:    u.FullName,
		Phone:       u.Phone,
		Address:     u.Address,
		Role:        u.Role,
		FotoProfile: u.FotoProfile,
		Token:       u.Token,
	}
}
