package responses

// Response es la estructura base para todas las respuestas
type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

// ErrorResponse es la estructura para respuestas de error
type ErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Code    string `json:"code,omitempty"`
}

// PaginatedResponse es la estructura para respuestas paginadas
type PaginatedResponse struct {
	Status     string      `json:"status"`
	Data       interface{} `json:"data"`
	TotalItems int64       `json:"totalItems"`
	Page       int         `json:"page"`
	PageSize   int         `json:"pageSize"`
	TotalPages int         `json:"totalPages"`
}
