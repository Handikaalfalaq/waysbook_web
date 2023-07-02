package usersdto

type UpdateUserRequest struct {
	Email       string `json:"email"`
	Password    string `json:"password"`
	FullName    string `json:"fullName"`
	Gender      string `json:"gender"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	FotoProfile string `json:"fotoProfile"`
}
