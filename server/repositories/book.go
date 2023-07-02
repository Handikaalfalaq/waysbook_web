package repositories

import (
	"waysbook/models"

	"gorm.io/gorm"
)

type BookRepository interface {
	CreateBook(book models.Book) (models.Book, error)
	FindBooks() ([]models.Book, error)
	GetBook(Id int) (models.Book, error)
	UpdateBook(book models.Book) (models.Book, error)
	DeleteBook(book models.Book, ID int) (models.Book, error)
}

func RepositoryBook(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateBook(book models.Book) (models.Book, error) {
	err := r.db.Create(&book).Error

	return book, err
}

func (r *repository) FindBooks() ([]models.Book, error) {
	var books []models.Book
	err := r.db.Find(&books).Error

	return books, err
}

func (r *repository) GetBook(Id int) (models.Book, error) {
	var book models.Book

	err := r.db.First(&book, Id).Error

	return book, err
}

func (r *repository) UpdateBook(book models.Book) (models.Book, error) {
	err := r.db.Save(&book).Error

	return book, err
}

func (r *repository) DeleteBook(book models.Book, ID int) (models.Book, error) {
	err := r.db.Delete(&book, ID).Scan(&book).Error

	return book, err
}
