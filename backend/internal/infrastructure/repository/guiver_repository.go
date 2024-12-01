package repository

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/guiver/internal/domain/models"
	"github.com/guiver/internal/infrastructure/firestore"
)

const guiversCollection = "guivers"

// GuiverRepository implementa el repositorio de Guivers usando Firestore
type GuiverRepository struct {
	db *firestore.Client
}

// NewGuiverRepository crea una nueva instancia de GuiverRepository
func NewGuiverRepository(db *firestore.Client) *GuiverRepository {
	return &GuiverRepository{db: db}
}

// Create crea un nuevo Guiver
func (r *GuiverRepository) Create(ctx context.Context, guiver *models.Guiver) error {
	if guiver.ID == "" {
		guiver.ID = uuid.New().String()
	}
	
	now := time.Now()
	guiver.CreatedAt = now
	guiver.UpdatedAt = now

	return r.db.Create(ctx, guiversCollection, guiver.ID, guiver)
}

// GetByID obtiene un Guiver por su ID
func (r *GuiverRepository) GetByID(ctx context.Context, id string) (*models.Guiver, error) {
	var guiver models.Guiver
	err := r.db.Get(ctx, guiversCollection, id, &guiver)
	if err != nil {
		return nil, err
	}
	return &guiver, nil
}

// Update actualiza un Guiver
func (r *GuiverRepository) Update(ctx context.Context, guiver *models.Guiver) error {
	guiver.UpdatedAt = time.Now()
	return r.db.Update(ctx, guiversCollection, guiver.ID, guiver)
}

// Delete elimina un Guiver
func (r *GuiverRepository) Delete(ctx context.Context, id string) error {
	return r.db.Delete(ctx, guiversCollection, id)
}
