package repositories

import (
	"errors"
	"waysbook/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	CreateCart(cart models.Cart) (models.Cart, error)
	GetCart(Id int) (models.Cart, error)
	FindCarts(userID string) ([]models.Cart, error)
	DeleteCart(cart models.Cart, ID int) (models.Cart, error)
	DeleteCartByUserID(carts []models.Cart) error
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Where("id_user = ? AND id_book = ?", cart.IdUser, cart.IdBook).First(&cart).Error
	if err == nil {
		return cart, errors.New("buku sudah ada di keranjang")
	}

	err = r.db.Create(&cart).Error

	return cart, err
}

func (r *repository) GetCart(Id int) (models.Cart, error) {
	var cart models.Cart

	err := r.db.Preload("User").Preload("Book").First(&cart, Id).Error

	return cart, err
}

func (r *repository) FindCarts(userID string) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("User").Preload("Book").Where("id_user = ?", userID).Find(&carts).Error

	return carts, err
}

func (r *repository) DeleteCart(cart models.Cart, ID int) (models.Cart, error) {
	err := r.db.Delete(&cart, ID).Scan(&cart).Error

	return cart, err
}
func (r *repository) DeleteCartByUserID(carts []models.Cart) error {
	err := r.db.Delete(&carts).Error

	return err
}
