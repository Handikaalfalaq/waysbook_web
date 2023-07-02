package cartdto

type CreateCartRequest struct {
	Id     int `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	IdUser int `json:"idUser" form:"idUser"`
	IdBook int `json:"idBook" form:"idook"`
}
