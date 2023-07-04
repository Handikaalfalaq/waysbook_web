package models

type Transaction struct {
	Id               int               `json:"id" gorm:"primary_key:auto_increment"`
	IdUser           int               `json:"idUser" form:"idUser"`
	User             User              `json:"user" form:"user" gorm:"foreignKey:IdUser"`
	TransactionBooks []TransactionBook `json:"transactionBooks" form:"transactionBooks" gorm:"foreignKey:IdTransaction"`
	Total            int               `json:"total" form:"total"`
	Status           string            `json:"status" form:"status"`
}
