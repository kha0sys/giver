package repository

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/guiver/internal/domain/models"
	"github.com/guiver/internal/domain/repository"
	"github.com/guiver/internal/infrastructure/firestore"
)

const (
	causesCollection   = "causes"
	updatesCollection  = "updates"
	commentsCollection = "comments"
)

// CauseRepository implementa el repositorio de Causas usando Firestore
type CauseRepository struct {
	db *firestore.Client
}

// NewCauseRepository crea una nueva instancia de CauseRepository
func NewCauseRepository(db *firestore.Client) *CauseRepository {
	return &CauseRepository{db: db}
}

// Create crea una nueva Causa
func (r *CauseRepository) Create(ctx context.Context, cause *models.Cause) error {
	if cause.ID == "" {
		cause.ID = uuid.New().String()
	}
	
	now := time.Now()
	cause.CreatedAt = now
	cause.UpdatedAt = now
	cause.Likes = 0

	return r.db.Create(ctx, causesCollection, cause.ID, cause)
}

// GetByID obtiene una Causa por su ID
func (r *CauseRepository) GetByID(ctx context.Context, id string) (*models.Cause, error) {
	var cause models.Cause
	err := r.db.Get(ctx, causesCollection, id, &cause)
	if err != nil {
		return nil, err
	}
	return &cause, nil
}

// GetByGuiverID obtiene las Causas de un Guiver
func (r *CauseRepository) GetByGuiverID(ctx context.Context, guiverID string) ([]*models.Cause, error) {
	var causes []*models.Cause
	queries := []firestore.Query{
		firestore.WhereQuery{Field: "guiverId", Op: "==", Value: guiverID},
		firestore.OrderByQuery{Field: "createdAt", Direction: firestore.DESC},
	}
	
	err := r.db.Query(ctx, causesCollection, queries, &causes)
	if err != nil {
		return nil, err
	}
	return causes, nil
}

// Update actualiza una Causa
func (r *CauseRepository) Update(ctx context.Context, cause *models.Cause) error {
	cause.UpdatedAt = time.Now()
	return r.db.Update(ctx, causesCollection, cause.ID, cause)
}

// Delete elimina una Causa
func (r *CauseRepository) Delete(ctx context.Context, id string) error {
	return r.db.Delete(ctx, causesCollection, id)
}

// List lista las Causas según los filtros
func (r *CauseRepository) List(ctx context.Context, filter repository.CauseFilter) ([]*models.Cause, error) {
	var causes []*models.Cause
	var queries []firestore.Query

	if filter.Type != "" {
		queries = append(queries, firestore.WhereQuery{Field: "type", Op: "==", Value: filter.Type})
	}
	if filter.Status != "" {
		queries = append(queries, firestore.WhereQuery{Field: "status", Op: "==", Value: filter.Status})
	}
	if filter.Location != "" {
		queries = append(queries, firestore.WhereQuery{Field: "location", Op: "==", Value: filter.Location})
	}

	queries = append(queries,
		firestore.OrderByQuery{Field: "createdAt", Direction: firestore.DESC},
		firestore.LimitQuery{Limit: filter.Limit},
		firestore.OffsetQuery{Offset: filter.Offset},
	)

	err := r.db.Query(ctx, causesCollection, queries, &causes)
	if err != nil {
		return nil, err
	}
	return causes, nil
}

// AddUpdate agrega una actualización a una Causa
func (r *CauseRepository) AddUpdate(ctx context.Context, causeID string, update *models.Update) error {
	update.ID = uuid.New().String()
	update.CreatedAt = time.Now()

	cause, err := r.GetByID(ctx, causeID)
	if err != nil {
		return err
	}

	cause.Updates = append(cause.Updates, *update)
	return r.Update(ctx, cause)
}

// AddComment agrega un comentario a una Causa
func (r *CauseRepository) AddComment(ctx context.Context, causeID string, comment *models.Comment) error {
	comment.ID = uuid.New().String()
	comment.CreatedAt = time.Now()

	return r.db.Create(ctx, causesCollection+"/"+causeID+"/"+commentsCollection, comment.ID, comment)
}

// UpdateLikes actualiza los likes de una Causa
func (r *CauseRepository) UpdateLikes(ctx context.Context, causeID string, increment bool) error {
	cause, err := r.GetByID(ctx, causeID)
	if err != nil {
		return err
	}

	if increment {
		cause.Likes++
	} else if cause.Likes > 0 {
		cause.Likes--
	}

	return r.Update(ctx, cause)
}
