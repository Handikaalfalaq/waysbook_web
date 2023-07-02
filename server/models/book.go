package models

import "time"

type Book struct {
	Id              int       `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	Author          string    `json:"author" form:"author"`
	Title           string    `json:"title" form:"title"`
	PublicationDate string    `json:"publicationDate" form:"publicationDate" `
	Pages           string    `json:"pages" form:"pages"`
	Isbn            string    `json:"isbn" form:"isbn"`
	Price           int       `json:"price" form:"price"`
	Discount        int       `json:"discount" form:"discount"`
	PriceDiscount   int       `json:"priceDiscount" form:"priceDiscount"`
	Description     string    `json:"description" form:"description"`
	Sold            int       `json:"sold" form:"sold"`
	Image           string    `json:"image" form:"image"`
	Pdf             string    `json:"pdf" form:"pdf"`
	CreatedAt       time.Time `json:"-"`
	UpdatedAt       time.Time `json:"-"`
}
