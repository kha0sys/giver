package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/guiver/internal/domain/models"
	"github.com/guiver/internal/domain/repository"
)

// ProductHandler maneja las rutas relacionadas con los productos
type ProductHandler struct {
	BaseHandler
	productRepo repository.ProductRepository
	causeRepo   repository.CauseRepository
}

// NewProductHandler crea una nueva instancia de ProductHandler
func NewProductHandler(productRepo repository.ProductRepository, causeRepo repository.CauseRepository) *ProductHandler {
	return &ProductHandler{
		productRepo: productRepo,
		causeRepo:   causeRepo,
	}
}

// Register registra las rutas del handler
func (h *ProductHandler) Register(r *gin.RouterGroup) {
	products := r.Group("/products")
	{
		products.POST("", h.createProduct)
		products.GET("", h.listProducts)
		products.GET("/:id", h.getProduct)
		products.PUT("/:id", h.updateProduct)
		products.DELETE("/:id", h.deleteProduct)
		products.GET("/cause/:causeId", h.getProductsByCause)
	}
}

// CreateProductRequest es la estructura para crear un producto
type CreateProductRequest struct {
	CauseID           string           `json:"causeId" binding:"required"`
	Title             string           `json:"title" binding:"required"`
	Description       string           `json:"description" binding:"required"`
	Price             float64          `json:"price" binding:"required"`
	DonationPercentage int             `json:"donationPercentage" binding:"required,min=1,max=100"`
	ImageURLs         []string         `json:"imageUrls"`
	ContactInfo       models.ContactInfo `json:"contactInfo"`
}

func (h *ProductHandler) createProduct(c *gin.Context) {
	var req CreateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Verificar que la causa existe
	cause, err := h.causeRepo.GetByID(c.Request.Context(), req.CauseID)
	if err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid cause ID")
		return
	}

	guiverID, _ := c.Get("userId")
	product := &models.Product{
		GuiverID:          guiverID.(string),
		CauseID:           req.CauseID,
		Title:             req.Title,
		Description:       req.Description,
		Price:             req.Price,
		DonationPercentage: req.DonationPercentage,
		ImageURLs:         req.ImageURLs,
		ContactInfo:       req.ContactInfo,
		Status:            "active",
	}

	if err := h.productRepo.Create(c.Request.Context(), product); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error creating product")
		return
	}

	h.sendSuccess(c, map[string]interface{}{
		"product": product,
		"cause":   cause,
	})
}

func (h *ProductHandler) listProducts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	minPrice, _ := strconv.ParseFloat(c.Query("minPrice"), 64)
	maxPrice, _ := strconv.ParseFloat(c.Query("maxPrice"), 64)

	filter := repository.ProductFilter{
		CauseID:  c.Query("causeId"),
		GuiverID: c.Query("guiverId"),
		Search:   c.Query("search"),
		MinPrice: minPrice,
		MaxPrice: maxPrice,
		Limit:    limit,
		Offset:   (page - 1) * limit,
	}

	products, err := h.productRepo.List(c.Request.Context(), filter)
	if err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error listing products")
		return
	}

	// TODO: Implementar el conteo total para la paginación
	h.sendPaginated(c, products, int64(len(products)), page, limit)
}

func (h *ProductHandler) getProduct(c *gin.Context) {
	id := c.Param("id")
	product, err := h.productRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Product not found")
		return
	}

	h.sendSuccess(c, product)
}

// UpdateProductRequest es la estructura para actualizar un producto
type UpdateProductRequest struct {
	Title             string           `json:"title"`
	Description       string           `json:"description"`
	Price             float64          `json:"price"`
	DonationPercentage int             `json:"donationPercentage" binding:"min=1,max=100"`
	ImageURLs         []string         `json:"imageUrls"`
	Status            string           `json:"status"`
	ContactInfo       models.ContactInfo `json:"contactInfo"`
}

func (h *ProductHandler) updateProduct(c *gin.Context) {
	id := c.Param("id")
	var req UpdateProductRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.sendError(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	product, err := h.productRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Product not found")
		return
	}

	// Verificar que el usuario actual es el dueño del producto
	guiverID, _ := c.Get("userId")
	if product.GuiverID != guiverID.(string) {
		h.sendError(c, http.StatusForbidden, "Not authorized to update this product")
		return
	}

	// Actualizar solo los campos proporcionados
	if req.Title != "" {
		product.Title = req.Title
	}
	if req.Description != "" {
		product.Description = req.Description
	}
	if req.Price > 0 {
		product.Price = req.Price
	}
	if req.DonationPercentage > 0 {
		product.DonationPercentage = req.DonationPercentage
	}
	if req.ImageURLs != nil {
		product.ImageURLs = req.ImageURLs
	}
	if req.Status != "" {
		product.Status = req.Status
	}
	if req.ContactInfo != (models.ContactInfo{}) {
		product.ContactInfo = req.ContactInfo
	}

	if err := h.productRepo.Update(c.Request.Context(), product); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error updating product")
		return
	}

	h.sendSuccess(c, product)
}

func (h *ProductHandler) deleteProduct(c *gin.Context) {
	id := c.Param("id")
	
	// Verificar que el usuario actual es el dueño del producto
	product, err := h.productRepo.GetByID(c.Request.Context(), id)
	if err != nil {
		h.sendError(c, http.StatusNotFound, "Product not found")
		return
	}

	guiverID, _ := c.Get("userId")
	if product.GuiverID != guiverID.(string) {
		h.sendError(c, http.StatusForbidden, "Not authorized to delete this product")
		return
	}

	if err := h.productRepo.Delete(c.Request.Context(), id); err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error deleting product")
		return
	}

	h.sendSuccess(c, gin.H{"message": "Product deleted successfully"})
}

func (h *ProductHandler) getProductsByCause(c *gin.Context) {
	causeID := c.Param("causeId")
	products, err := h.productRepo.GetByCauseID(c.Request.Context(), causeID)
	if err != nil {
		h.sendError(c, http.StatusInternalServerError, "Error getting products")
		return
	}

	h.sendSuccess(c, products)
}
