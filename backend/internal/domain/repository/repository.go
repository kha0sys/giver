package repository

import (
	"context"

	"github.com/guiver/internal/domain/models"
)

// GuiverRepository define las operaciones para Guivers
type GuiverRepository interface {
	Create(ctx context.Context, guiver *models.Guiver) error
	GetByID(ctx context.Context, id string) (*models.Guiver, error)
	Update(ctx context.Context, guiver *models.Guiver) error
	Delete(ctx context.Context, id string) error
}

// CauseRepository define las operaciones para causas
type CauseRepository interface {
	Create(ctx context.Context, cause *models.Cause) error
	GetByID(ctx context.Context, id string) (*models.Cause, error)
	GetByGuiverID(ctx context.Context, guiverID string) ([]*models.Cause, error)
	Update(ctx context.Context, cause *models.Cause) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter CauseFilter) ([]*models.Cause, error)
	AddUpdate(ctx context.Context, causeID string, update *models.Update) error
	AddComment(ctx context.Context, causeID string, comment *models.Comment) error
	UpdateLikes(ctx context.Context, causeID string, increment bool) error
}

// ProductRepository define las operaciones para productos
type ProductRepository interface {
	Create(ctx context.Context, product *models.Product) error
	GetByID(ctx context.Context, id string) (*models.Product, error)
	GetByCauseID(ctx context.Context, causeID string) ([]*models.Product, error)
	GetByGuiverID(ctx context.Context, guiverID string) ([]*models.Product, error)
	Update(ctx context.Context, product *models.Product) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter ProductFilter) ([]*models.Product, error)
}

// CauseFilter define los filtros para buscar causas
type CauseFilter struct {
	Type     models.CauseType
	Status   models.CauseStatus
	Location string
	Search   string
	Limit    int
	Offset   int
}

// ProductFilter define los filtros para buscar productos
type ProductFilter struct {
	CauseID  string
	GuiverID string
	Search   string
	MinPrice float64
	MaxPrice float64
	Limit    int
	Offset   int
}
