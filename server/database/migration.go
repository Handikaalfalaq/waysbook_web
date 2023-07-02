package database

import (
	"waysbook/models"
	mysql "waysbook/pkg/database"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(&models.User{}, &models.Book{}, &models.Cart{}, &models.Transaction{}, &models.TransactionBook{})

	if err != nil {
		panic("Migration Failed")
	}
}
