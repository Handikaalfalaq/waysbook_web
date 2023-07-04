package repositories

import (
	"waysbook/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (int, error)
	FindTransactionsByIdUser(userIdstr int) ([]models.Transaction, error)
	FindAllTransactions() ([]models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
	FindTransactionId(Id int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (int, error) {
	err := r.db.Create(&transaction).Error
	if err != nil {
		return 0, err
	}

	var carts []models.Cart
	err = r.db.Where("id_user = ?", transaction.IdUser).Find(&carts).Error

	if err != nil {
		return 0, err
	}

	transactionBooks := make([]models.TransactionBook, len(carts))

	for i, cart := range carts {
		transactionBooks[i] = models.TransactionBook{
			IdTransaction: transaction.Id,
			IdBook:        cart.IdBook,
		}
	}
	err = r.db.Create(&transactionBooks).Error

	return transaction.Id, err
}

func (r *repository) FindTransactionsByIdUser(userIdstr int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("TransactionBooks.Book").Where("id_user = ?", userIdstr).Find(&transactions).Error

	return transactions, err
}

func (r *repository) FindAllTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("TransactionBooks.Book").Find(&transactions).Error

	return transactions, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("User").Preload("TransactionBooks").First(&transaction, orderId)

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err

}

func (r *repository) FindTransactionId(Id int) (models.Transaction, error) {
	var Tansactions models.Transaction
	err := r.db.Preload("User").First(&Tansactions, Id).Error

	return Tansactions, err
}
