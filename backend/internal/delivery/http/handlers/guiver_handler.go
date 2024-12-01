package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/guiver/internal/domain/models"
	"github.com/guiver/internal/domain/repository"
)

// GuiverHandler maneja las rutas relacionadas con los Guivers
type GuiverHandler struct {
	BaseHandler
	guiverRepo repository.GuiverRepository
}

// NewGuiverHandler crea una nueva instancia de GuiverHandler
func NewGuiverHandler(guiverRepo repository.GuiverRepository) *GuiverHandler {
	return &GuiverHandler{
		guiverRepo: guiverRepo,
	}
}

// Register registra las rutas del handler
func (h *GuiverHandler) Register(r *gin.RouterGroup) {
	guivers := r.Group("/guivers")
	{
		guivers.POST("", h.createGuiver)
		guivers.GET("/:id", h.getGuiver)
		guivers.PUT("/:id", h.updateGuiver)
		guivers.DELETE("/:id", h.deleteGuiver)
		guivers.GET("/:id/causes", h.getGuiverCauses)
		guivers.GET("/:id/products", h.getGuiverProducts)
	}
}

// CreateGuiverRequest es la estructura para crear un Guiver
type CreateGuiverRequest struct {
	DisplayName string          `json:"displayName" binding:"required"`
	Email      string          `json:"email" binding:"required,email"`
	Type       models.GuiverType `json:"type" binding:"required"`
	Bio        string          `json:"bio"`
	WhatsApp   string          `json:"whatsApp"`
	Instagram  string          `json:"instagram"`
}

func (h *GuiverHandler) createGuiver(c *gin.Context) {
	var req CreateGuiverRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	guiver := &models.Guiver{
		DisplayName: req.DisplayName,
		Email:      req.Email,
		Type:       req.Type,
		Bio:        req.Bio,
		WhatsApp:   req.WhatsApp,
		Instagram:  req.Instagram,
	}

	if err := h.guiverRepo.Create(c.Request.Context(), guiver); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error creating guiver")
		return
	}

	h.sendSuccess(c, guiver)
}

func (h *GuiverHandler) getGuiver(c *gin.Context) {
	id := c.Param("id")
	guiver, err := h.guiverRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Guiver not found")
		return
	}

	h.sendSuccess(c, guiver)
}

// UpdateGuiverRequest es la estructura para actualizar un Guiver
type UpdateGuiverRequest struct {
	DisplayName string `json:"displayName"`
	Bio        string `json:"bio"`
	WhatsApp   string `json:"whatsApp"`
	Instagram  string `json:"instagram"`
}

func (h *GuiverHandler) updateGuiver(c *gin.Context) {
	id := c.Param("id")
	var req UpdateGuiverRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	guiver, err := h.guiverRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Guiver not found")
		return
	}

	// Actualizar solo los campos proporcionados
	if req.DisplayName != "" {
		guiver.DisplayName = req.DisplayName
	}
	if req.Bio != "" {
		guiver.Bio = req.Bio
	}
	if req.WhatsApp != "" {
		guiver.WhatsApp = req.WhatsApp
	}
	if req.Instagram != "" {
		guiver.Instagram = req.Instagram
	}

	if err := h.guiverRepo.Update(c.Request.Context(), guiver); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error updating guiver")
		return
	}

	h.sendSuccess(c, guiver)
}

func (h *GuiverHandler) deleteGuiver(c *gin.Context) {
	id := c.Param("id")
	if err := h.guiverRepo.Delete(c.Request.Context(), id); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error deleting guiver")
		return
	}

	h.sendSuccess(c, gin.H{"message": "Guiver deleted successfully"})
}

func (h *GuiverHandler) getGuiverCauses(c *gin.Context) {
	// Esta función se implementará cuando tengamos el CauseRepository
	h.sendError(c, http.StatusNotImplemented, "Not implemented yet")
}

func (h *GuiverHandler) getGuiverProducts(c *gin.Context) {
	// Esta función se implementará cuando tengamos el ProductRepository
	h.sendError(c, http.StatusNotImplemented, "Not implemented yet")
}
