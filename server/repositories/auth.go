package repositories

import (
	"errors"
	"waysbook/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User) (models.User, error)
	Login(email string) (models.User, error)
	CheckAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user models.User) (models.User, error) {

	var count int
	err := r.db.Raw("SELECT COUNT(*) FROM users where email = ?", user.Email).Scan(&count).Error

	if err != nil {
		return user, err
	}

	if count == 0 {
		err = r.db.Create(&user).Error
	} else {
		err = errors.New("email tersebut telah terdaftar")
	}
	return user, err
}

func (r *repository) Login(email string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}

func (r *repository) CheckAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}

// err := r.db.Preload("Book").First(&user, ID).Error
