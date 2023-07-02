package authdto

type LoginResponse struct {
	Id          int    `json:"id" gorm:"primary_key, auto_increment"`
	Email       string `json:"email" gorm:"varchar(255)"`
	Password    string `json:"password" gorm:"varchar(255)"`
	FullName    string `json:"fullName" gorm:"varchar(255)"`
	Gender      string `json:"gender" gorm:"varchar(255)"`
	Phone       string `json:"phone" gorm:"varchar(255)"`
	Address     string `json:"address" gorm:"varchar(255)"`
	Role        string `json:"role"`
	Token       string `json:"token"`
	FotoProfile string `json:"fotoProfile"`
}
