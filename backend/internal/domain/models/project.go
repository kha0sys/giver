package models

import "time"

// CauseType representa el tipo de causa
type CauseType string

const (
	CauseTypeSocial       CauseType = "social"
	CauseTypeAnimal       CauseType = "animal"
	CauseTypeEnvironment  CauseType = "environment"
)

// CauseStatus representa el estado de una causa
type CauseStatus string

const (
	CauseStatusDraft     CauseStatus = "draft"
	CauseStatusActive    CauseStatus = "active"
	CauseStatusCompleted CauseStatus = "completed"
	CauseStatusCancelled CauseStatus = "cancelled"
)

// Cause representa una causa social, animal o ambiental
type Cause struct {
	ID          string      `json:"id" firestore:"id"`
	GuiverID    string      `json:"guiverId" firestore:"guiverId"`
	Title       string      `json:"title" firestore:"title"`
	Description string      `json:"description" firestore:"description"`
	Type        CauseType   `json:"type" firestore:"type"`
	ImageURLs   []string    `json:"imageUrls" firestore:"imageUrls"`
	Status      CauseStatus `json:"status" firestore:"status"`
	Location    string      `json:"location" firestore:"location"`
	ContactInfo ContactInfo `json:"contactInfo" firestore:"contactInfo"`
	Updates     []Update    `json:"updates" firestore:"updates"`
	Likes       int         `json:"likes" firestore:"likes"`
	CreatedAt   time.Time   `json:"createdAt" firestore:"createdAt"`
	UpdatedAt   time.Time   `json:"updatedAt" firestore:"updatedAt"`
}

// Product representa un producto que apoya una causa
type Product struct {
	ID          string    `json:"id" firestore:"id"`
	GuiverID    string    `json:"guiverId" firestore:"guiverId"`
	CauseID     string    `json:"causeId" firestore:"causeId"`
	Title       string    `json:"title" firestore:"title"`
	Description string    `json:"description" firestore:"description"`
	ImageURLs   []string  `json:"imageUrls" firestore:"imageUrls"`
	Price       float64   `json:"price" firestore:"price"`
	DonationPercentage int `json:"donationPercentage" firestore:"donationPercentage"`
	Status      string    `json:"status" firestore:"status"`
	ContactInfo ContactInfo `json:"contactInfo" firestore:"contactInfo"`
	CreatedAt   time.Time  `json:"createdAt" firestore:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt" firestore:"updatedAt"`
}

// Update representa una actualización de una causa
type Update struct {
	ID        string    `json:"id" firestore:"id"`
	Content   string    `json:"content" firestore:"content"`
	ImageURLs []string  `json:"imageUrls" firestore:"imageUrls"`
	CreatedAt time.Time `json:"createdAt" firestore:"createdAt"`
}

// Comment representa un comentario en una causa
type Comment struct {
	ID        string    `json:"id" firestore:"id"`
	GuiverID  string    `json:"guiverId" firestore:"guiverId"`
	Content   string    `json:"content" firestore:"content"`
	CreatedAt time.Time `json:"createdAt" firestore:"createdAt"`
}

// ContactInfo representa la información de contacto
type ContactInfo struct {
	WhatsApp  string `json:"whatsApp,omitempty" firestore:"whatsApp,omitempty"`
	Instagram string `json:"instagram,omitempty" firestore:"instagram,omitempty"`
	Email     string `json:"email,omitempty" firestore:"email,omitempty"`
}
