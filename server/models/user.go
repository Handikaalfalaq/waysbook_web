package models

import "time"

type User struct {
	Id          int       `json:"id" gorm:"primary_key, auto_increment"`
	Email       string    `json:"email" gorm:"varchar(255)"`
	Password    string    `json:"password" gorm:"varchar(255)"`
	FullName    string    `json:"fullName" gorm:"varchar(255)"`
	Gender      string    `json:"gender"`
	Phone       string    `json:"phone" gorm:"varchar(255)"`
	Address     string    `json:"address" gorm:"varchar(255)"`
	Role        string    `json:"role"`
	FotoProfile string    `json:"fotoProfile"`
	Token       string    `json:"token"`
	CreatedAt   time.Time `json:"created_at"`
	UpdateAt    time.Time `json:"update_at"`
}

// type UsersProfileResponse struct {
// 	Id          int    `json:"id" `
// 	Email       string `json:"email" `
// 	Password    string `json:"password" `
// 	FullName    string `json:"fullName" `
// 	Phone       string `json:"phone" `
// 	Address     string `json:"address" `
// 	Role        string `json:"role"`
// 	FotoProfile string `json:"fotoProfile"`
// 	Token       string `json:"token"`
// }

// func (UsersProfileResponse) TableName() string {
// 	return "user"
// }
