package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/guiver/internal/domain/models"
	"github.com/guiver/internal/domain/repository"
)

// CauseHandler maneja las rutas relacionadas con las causas
type CauseHandler struct {
	BaseHandler
	causeRepo repository.CauseRepository
}

// NewCauseHandler crea una nueva instancia de CauseHandler
func NewCauseHandler(causeRepo repository.CauseRepository) *CauseHandler {
	return &CauseHandler{
		causeRepo: causeRepo,
	}
}

// Register registra las rutas del handler
func (h *CauseHandler) Register(r *gin.RouterGroup) {
	causes := r.Group("/causes")
	{
		causes.POST("", h.createCause)
		causes.GET("", h.listCauses)
		causes.GET("/:id", h.getCause)
		causes.PUT("/:id", h.updateCause)
		causes.DELETE("/:id", h.deleteCause)
		causes.POST("/:id/updates", h.addUpdate)
		causes.POST("/:id/comments", h.addComment)
		causes.POST("/:id/like", h.likeCause)
		causes.POST("/:id/unlike", h.unlikeCause)
	}
}

// CreateCauseRequest es la estructura para crear una causa
type CreateCauseRequest struct {
	Title       string          `json:"title" binding:"required"`
	Description string          `json:"description" binding:"required"`
	Type        models.CauseType `json:"type" binding:"required"`
	Location    string          `json:"location" binding:"required"`
	ImageURLs   []string        `json:"imageUrls"`
	ContactInfo models.ContactInfo `json:"contactInfo"`
}

func (h *CauseHandler) createCause(c *gin.Context) {
	var req CreateCauseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Obtener el ID del Guiver del contexto (establecido por el middleware de auth)
	guiverID, exists := c.Get("userId")
	if !exists {
		h.sendError(c, http.StatusUnauthorized, "User not authenticated")
		return
	}

	cause := &models.Cause{
		GuiverID:    guiverID.(string),
		Title:       req.Title,
		Description: req.Description,
		Type:        req.Type,
		Location:    req.Location,
		ImageURLs:   req.ImageURLs,
		ContactInfo: req.ContactInfo,
		Status:      models.CauseStatusActive,
	}

	if err := h.causeRepo.Create(c.Request.Context(), cause); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error creating cause")
		return
	}

	h.sendSuccess(c, cause)
}

func (h *CauseHandler) listCauses(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	filter := repository.CauseFilter{
		Type:     models.CauseType(c.Query("type")),
		Status:   models.CauseStatus(c.Query("status")),
		Location: c.Query("location"),
		Search:   c.Query("search"),
		Limit:    limit,
		Offset:   (page - 1) * limit,
	}

	causes, err := h.causeRepo.List(c.Request.Context(), filter)
	if err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error listing causes")
		return
	}

	// TODO: Implementar el conteo total para la paginación
	h.sendPaginated(c, causes, int64(len(causes)), page, limit)
}

func (h *CauseHandler) getCause(c *gin.Context) {
	id := c.Param("id")
	cause, err := h.causeRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Cause not found")
		return
	}

	h.sendSuccess(c, cause)
}

// UpdateCauseRequest es la estructura para actualizar una causa
type UpdateCauseRequest struct {
	Title       string           `json:"title"`
	Description string           `json:"description"`
	Location    string           `json:"location"`
	ImageURLs   []string         `json:"imageUrls"`
	Status      models.CauseStatus `json:"status"`
	ContactInfo models.ContactInfo  `json:"contactInfo"`
}

func (h *CauseHandler) updateCause(c *gin.Context) {
	id := c.Param("id")
	var req UpdateCauseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	cause, err := h.causeRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Cause not found")
		return
	}

	// Verificar que el usuario actual es el dueño de la causa
	guiverID, _ := c.Get("userId")
	if cause.GuiverID != guiverID.(string) {
		h.sendError(c, http.StatusForbidden, "Not authorized to update this cause")
		return
	}

	// Actualizar solo los campos proporcionados
	if req.Title != "" {
		cause.Title = req.Title
	}
	if req.Description != "" {
		cause.Description = req.Description
	}
	if req.Location != "" {
		cause.Location = req.Location
	}
	if req.ImageURLs != nil {
		cause.ImageURLs = req.ImageURLs
	}
	if req.Status != "" {
		cause.Status = req.Status
	}
	if req.ContactInfo != (models.ContactInfo{}) {
		cause.ContactInfo = req.ContactInfo
	}

	if err := h.causeRepo.Update(c.Request.Context(), cause); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error updating cause")
		return
	}

	h.sendSuccess(c, cause)
}

func (h *CauseHandler) deleteCause(c *gin.Context) {
	id := c.Param("id")
	
	// Verificar que el usuario actual es el dueño de la causa
	cause, err := h.causeRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Cause not found")
		return
	}

	guiverID, _ := c.Get("userId")
	if cause.GuiverID != guiverID.(string) {
		h.sendError(c, http.StatusForbidden, "Not authorized to delete this cause")
		return
	}

	if err := h.causeRepo.Delete(c.Request.Context(), id); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error deleting cause")
		return
	}

	h.sendSuccess(c, gin.H{"message": "Cause deleted successfully"})
}

// AddUpdateRequest es la estructura para agregar una actualización
type AddUpdateRequest struct {
	Content   string   `json:"content" binding:"required"`
	ImageURLs []string `json:"imageUrls"`
}

func (h *CauseHandler) addUpdate(c *gin.Context) {
	id := c.Param("id")
	var req AddUpdateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	update := &models.Update{
		Content:   req.Content,
		ImageURLs: req.ImageURLs,
	}

	if err := h.causeRepo.AddUpdate(c.Request.Context(), id, update); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error adding update")
		return
	}

	h.sendSuccess(c, update)
}

// AddCommentRequest es la estructura para agregar un comentario
type AddCommentRequest struct {
	Content string `json:"content" binding:"required"`
}

func (h *CauseHandler) addComment(c *gin.Context) {
	id := c.Param("id")
	var req AddCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	guiverID, _ := c.Get("userId")
	comment := &models.Comment{
		GuiverID: guiverID.(string),
		Content:  req.Content,
	}

	if err := h.causeRepo.AddComment(c.Request.Context(), id, comment); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error adding comment")
		return
	}

	h.sendSuccess(c, comment)
}

func (h *CauseHandler) likeCause(c *gin.Context) {
	id := c.Param("id")
	if err := h.causeRepo.UpdateLikes(c.Request.Context(), id, true); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error liking cause")
		return
	}

	h.sendSuccess(c, gin.H{"message": "Cause liked successfully"})
}

func (h *CauseHandler) unlikeCause(c *gin.Context) {
	id := c.Param("id")
	if err := h.causeRepo.UpdateLikes(c.Request.Context(), id, false); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error unliking cause")
		return
	}

	h.sendSuccess(c, gin.H{"message": "Cause unliked successfully"})
}
