package handlers

import (
	"math"
	"net/http"
	"strconv"
	bookdto "waysbook/dto/book"
	resultdto "waysbook/dto/result"
	"waysbook/models"
	"waysbook/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

var downloadFile = "http://localhost:5000/uploads/"

type handlerBook struct {
	BookRepository repositories.BookRepository
}

func HandlerBook(BookRepository repositories.BookRepository) *handlerBook {
	return &handlerBook{BookRepository}
}

func (h *handlerBook) CreateNewBook(c echo.Context) error {
	dataPdf := c.Get("dataPdf").(string)
	dataImage := c.Get("dataImage").(string)

	request := new(bookdto.CreateBookRequest)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error()})
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	price, _ := strconv.Atoi(c.FormValue("price"))
	discount, _ := strconv.Atoi(c.FormValue("discount"))
	priceDiscount := int(math.Floor(float64(price) - (float64(price) * float64(discount) / 100)))
	sold, _ := strconv.Atoi(c.FormValue("sold"))

	book := models.Book{
		Author:          c.FormValue("author"),
		Title:           c.FormValue("title"),
		PublicationDate: c.FormValue("publicationDate"),
		Pages:           c.FormValue("pages"),
		Isbn:            c.FormValue("isbn"),
		Price:           price,
		Discount:        discount,
		PriceDiscount:   priceDiscount,
		Description:     c.FormValue("description"),
		Sold:            sold,
		Image:           dataImage,
		Pdf:             dataPdf,
	}

	data, err := h.BookRepository.CreateBook(book)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseBook(data)})
}

func (h *handlerBook) GetAllBook(c echo.Context) error {
	books, err := h.BookRepository.FindBooks()
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range books {
		books[i].Pdf = downloadFile + p.Pdf
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: books})
}

func (h *handlerBook) GetBookById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	book, err := h.BookRepository.GetBook(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: book})
}

func (h *handlerBook) UpdateDataBook(c echo.Context) error {
	dataPdfUpdate := c.Get("dataPdf").(string)
	dataImageUpdate := c.Get("dataImage").(string)

	id, _ := strconv.Atoi(c.Param("id"))
	book, err := h.BookRepository.GetBook(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var author = c.FormValue("author")
	if author != "" {
		book.Author = author
	}

	var title = c.FormValue("title")
	if title != "" {
		book.Title = title
	}

	var publicationDate = c.FormValue("publicationDate")
	if publicationDate != "" {
		book.PublicationDate = publicationDate
	}

	var pages = c.FormValue("pages")
	if pages != "" {
		book.Pages = pages
	}

	var isbn = c.FormValue("isbn")
	if isbn != "" {
		book.Isbn = isbn
	}

	var price, _ = strconv.Atoi(c.FormValue("price"))
	if price != 0 {
		book.Price = price
	}

	var discount, _ = strconv.Atoi(c.FormValue("discount"))
	if discount != 0 {
		book.Discount = discount
	}

	var description = c.FormValue("description")
	if description != "" {
		book.Description = description
	}

	var dataPdf = dataPdfUpdate
	if dataPdf != "" {
		book.Pdf = dataPdf
	}

	var dataImage = dataImageUpdate
	if dataImage != "" {
		book.Image = dataImage
	}

	data, err := h.BookRepository.UpdateBook(book)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseBook(data)})
}

func (h *handlerBook) DeleteDataBook(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	book, err := h.BookRepository.GetBook(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, resultdto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.BookRepository.DeleteBook(book, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, resultdto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, resultdto.SuccessResult{Code: http.StatusOK, Data: convertResponseBook(data)})
}

func convertResponseBook(u models.Book) bookdto.BookResponse {
	return bookdto.BookResponse{
		Id:              u.Id,
		Author:          u.Author,
		Title:           u.Title,
		PublicationDate: u.PublicationDate,
		Pages:           u.Pages,
		Isbn:            u.Isbn,
		Price:           u.Price,
		Discount:        u.Discount,
		Description:     u.Description,
		Image:           u.Image,
		Pdf:             u.Pdf,
	}
}
