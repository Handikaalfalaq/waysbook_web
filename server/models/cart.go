package models

type Cart struct {
	Id     int  `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	IdUser int  `json:"idUser" form:"idUser"`
	User   User `json:"user" form:"user" gorm:"foreignKey:IdUser"`
	IdBook int  `json:"idBook" form:"idBook"`
	Book   Book `json:"book" form:"book" gorm:"foreignKey:IdBook"`
}
