package firestore

import (
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Client encapsula el cliente de Firestore
type Client struct {
	client *firestore.Client
}

// NewClient crea un nuevo cliente de Firestore
func NewClient(app *firebase.App) (*Client, error) {
	client, err := app.Firestore(context.Background())
	if err != nil {
		return nil, fmt.Errorf("error initializing Firestore client: %v", err)
	}
	return &Client{client: client}, nil
}

// Close cierra la conexión con Firestore
func (c *Client) Close() error {
	return c.client.Close()
}

// Create crea un nuevo documento
func (c *Client) Create(ctx context.Context, collection string, id string, data interface{}) error {
	_, err := c.client.Collection(collection).Doc(id).Set(ctx, data)
	return err
}

// Get obtiene un documento por ID
func (c *Client) Get(ctx context.Context, collection, id string, dest interface{}) error {
	doc, err := c.client.Collection(collection).Doc(id).Get(ctx)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			return fmt.Errorf("document not found")
		}
		return err
	}
	return doc.DataTo(dest)
}

// Update actualiza un documento
func (c *Client) Update(ctx context.Context, collection, id string, data interface{}) error {
	_, err := c.client.Collection(collection).Doc(id).Set(ctx, data)
	return err
}

// Delete elimina un documento
func (c *Client) Delete(ctx context.Context, collection, id string) error {
	_, err := c.client.Collection(collection).Doc(id).Delete(ctx)
	return err
}

// Query ejecuta una consulta en Firestore
func (c *Client) Query(ctx context.Context, collection string, queries []Query, dest interface{}) error {
	q := c.client.Collection(collection).Query

	for _, query := range queries {
		q = query.Apply(q)
	}

	iter := q.Documents(ctx)
	defer iter.Stop()

	var documents []*firestore.DocumentSnapshot
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		documents = append(documents, doc)
	}

	return documentsToSlice(documents, dest)
}

// Query representa una consulta de Firestore
type Query interface {
	Apply(q firestore.Query) firestore.Query
}

// WhereQuery representa una condición where
type WhereQuery struct {
	Field    string
	Op       string
	Value    interface{}
}

func (w WhereQuery) Apply(q firestore.Query) firestore.Query {
	return q.Where(w.Field, w.Op, w.Value)
}

// OrderByQuery representa una ordenación
type OrderByQuery struct {
	Field     string
	Direction firestore.Direction
}

func (o OrderByQuery) Apply(q firestore.Query) firestore.Query {
	return q.OrderBy(o.Field, o.Direction)
}

// LimitQuery representa un límite de resultados
type LimitQuery struct {
	Limit int
}

func (l LimitQuery) Apply(q firestore.Query) firestore.Query {
	return q.Limit(l.Limit)
}

// OffsetQuery representa un offset de resultados
type OffsetQuery struct {
	Offset int
}

func (o OffsetQuery) Apply(q firestore.Query) firestore.Query {
	return q.Offset(o.Offset)
}
