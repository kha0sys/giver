package repository

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/guiver/internal/domain/models"
	"github.com/guiver/internal/domain/repository"
	"github.com/guiver/internal/infrastructure/firestore"
)

const productsCollection = "products"

// ProductRepository implementa el repositorio de Productos usando Firestore
type ProductRepository struct {
	db *firestore.Client
}

// NewProductRepository crea una nueva instancia de ProductRepository
func NewProductRepository(db *firestore.Client) *ProductRepository {
	return &ProductRepository{db: db}
}

// Create crea un nuevo Producto
func (r *ProductRepository) Create(ctx context.Context, product *models.Product) error {
	if product.ID == "" {
		product.ID = uuid.New().String()
	}
	
	now := time.Now()
	product.CreatedAt = now
	product.UpdatedAt = now

	return r.db.Create(ctx, productsCollection, product.ID, product)
}

// GetByID obtiene un Producto por su ID
func (r *ProductRepository) GetByID(ctx context.Context, id string) (*models.Product, error) {
	var product models.Product
	err := r.db.Get(ctx, productsCollection, id, &product)
	if err != nil {
		return nil, err
	}
	return &product, nil
}

// GetByCauseID obtiene los Productos asociados a una Causa
func (r *ProductRepository) GetByCauseID(ctx context.Context, causeID string) ([]*models.Product, error) {
	var products []*models.Product
	queries := []firestore.Query{
		firestore.WhereQuery{Field: "causeId", Op: "==", Value: causeID},
		firestore.OrderByQuery{Field: "createdAt", Direction: firestore.DESC},
	}
	
	err := r.db.Query(ctx, productsCollection, queries, &products)
	if err != nil {
		return nil, err
	}
	return products, nil
}

// GetByGuiverID obtiene los Productos de un Guiver
func (r *ProductRepository) GetByGuiverID(ctx context.Context, guiverID string) ([]*models.Product, error) {
	var products []*models.Product
	queries := []firestore.Query{
		firestore.WhereQuery{Field: "guiverId", Op: "==", Value: guiverID},
		firestore.OrderByQuery{Field: "createdAt", Direction: firestore.DESC},
	}
	
	err := r.db.Query(ctx, productsCollection, queries, &products)
	if err != nil {
		return nil, err
	}
	return products, nil
}

// Update actualiza un Producto
func (r *ProductRepository) Update(ctx context.Context, product *models.Product) error {
	product.UpdatedAt = time.Now()
	return r.db.Update(ctx, productsCollection, product.ID, product)
}

// Delete elimina un Producto
func (r *ProductRepository) Delete(ctx context.Context, id string) error {
	return r.db.Delete(ctx, productsCollection, id)
}

// List lista los Productos según los filtros
func (r *ProductRepository) List(ctx context.Context, filter repository.ProductFilter) ([]*models.Product, error) {
	var products []*models.Product
	var queries []firestore.Query

	if filter.CauseID != "" {
		queries = append(queries, firestore.WhereQuery{Field: "causeId", Op: "==", Value: filter.CauseID})
	}
	if filter.GuiverID != "" {
		queries = append(queries, firestore.WhereQuery{Field: "guiverId", Op: "==", Value: filter.GuiverID})
	}
	if filter.MinPrice > 0 {
		queries = append(queries, firestore.WhereQuery{Field: "price", Op: ">=", Value: filter.MinPrice})
	}
	if filter.MaxPrice > 0 {
		queries = append(queries, firestore.WhereQuery{Field: "price", Op: "<=", Value: filter.MaxPrice})
	}

	queries = append(queries,
		firestore.OrderByQuery{Field: "createdAt", Direction: firestore.DESC},
		firestore.LimitQuery{Limit: filter.Limit},
		firestore.OffsetQuery{Offset: filter.Offset},
	)

	err := r.db.Query(ctx, productsCollection, queries, &products)
	if err != nil {
		return nil, err
	}
	return products, nil
}
