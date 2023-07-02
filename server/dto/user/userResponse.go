package usersdto

type UserResponse struct {
	Id          int    `json:"id"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	FullName    string `json:"fullName"`
	Gender      string `json:"gender"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	Role        string `json:"role"`
	Token       string `json:"token"`
	FotoProfile string `json:"fotoProfile"`
}
