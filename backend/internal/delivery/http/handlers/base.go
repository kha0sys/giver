package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/guiver/internal/delivery/http/responses"
)

// BaseHandler contiene funciones de utilidad para los handlers
type BaseHandler struct{}

// sendSuccess envía una respuesta exitosa
func (h *BaseHandler) sendSuccess(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, responses.Response{
		Status: "success",
		Data:   data,
	})
}

// sendError envía una respuesta de error
func (h *BaseHandler) sendError(c *gin.Context, code int, message string) {
	c.JSON(code, responses.ErrorResponse{
		Status:  "error",
		Message: message,
	})
}

// sendPaginated envía una respuesta paginada
func (h *BaseHandler) sendPaginated(c *gin.Context, data interface{}, total int64, page, pageSize int) {
	totalPages := int(total) / pageSize
	if int(total)%pageSize > 0 {
		totalPages++
	}

	c.JSON(http.StatusOK, responses.PaginatedResponse{
		Status:     "success",
		Data:       data,
		TotalItems: total,
		Page:       page,
		PageSize:   pageSize,
		TotalPages: totalPages,
	})
}
