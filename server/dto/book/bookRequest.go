package bookdto

type CreateBookRequest struct {
	Author          string `json:"author" form:"author"`
	Title           string `json:"title" form:"title"`
	PublicationDate string `json:"publicationDate" form:"publicationDate" `
	Pages           string `json:"pages" form:"pages"`
	Isbn            string `json:"isbn" form:"isbn"`
	Price           int    `json:"price" form:"price"`
	Discount        int    `json:"discount" form:"discount"`
	PriceDiscount   int    `json:"priceDiscount" form:"priceDiscount"`
	Description     string `json:"description" form:"description"`
	Sold            int    `json:"sold" form:"sold"`
	Image           string `json:"image" form:"image"`
	Pdf             int    `json:"pdf" form:"pdf"`
}
