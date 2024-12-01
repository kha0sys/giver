package firebase

import (
	"context"
	"fmt"
	"sync"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"firebase.google.com/go/v4/storage"
	"google.golang.org/api/option"
)

var (
	app     *firebase.App
	auth    *auth.Client
	storage *storage.Client
	once    sync.Once
)

// InitFirebase initializes Firebase with the service account
func InitFirebase() error {
	var err error
	once.Do(func() {
		opt := option.WithCredentialsFile("config/serviceAccountKey.json")
		app, err = firebase.NewApp(context.Background(), nil, opt)
		if err != nil {
			err = fmt.Errorf("error initializing app: %v", err)
			return
		}

		// Initialize Auth
		auth, err = app.Auth(context.Background())
		if err != nil {
			err = fmt.Errorf("error getting Auth client: %v", err)
			return
		}

		// Initialize Storage
		storage, err = app.Storage(context.Background())
		if err != nil {
			err = fmt.Errorf("error getting Storage client: %v", err)
			return
		}
	})
	return err
}

// GetAuthClient returns the Firebase Auth client
func GetAuthClient() *auth.Client {
	return auth
}

// GetStorageClient returns the Firebase Storage client
func GetStorageClient() *storage.Client {
	return storage
}

// VerifyIDToken verifies the Firebase ID token
func VerifyIDToken(ctx context.Context, idToken string) (*auth.Token, error) {
	token, err := auth.VerifyIDToken(ctx, idToken)
	if err != nil {
		return nil, fmt.Errorf("error verifying ID token: %v", err)
	}
	return token, nil
}
