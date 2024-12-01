package models

import "time"

// GuiverType representa el tipo de Guiver
type GuiverType string

const (
	GuiverTypeHelper       GuiverType = "helper"       // Guiver que ayuda a causas
	GuiverTypeEntrepreneur GuiverType = "entrepreneur" // Guiver emprendedor
)

// Guiver representa un usuario en el sistema
type Guiver struct {
	ID          string     `json:"id" firestore:"id"`
	Email       string     `json:"email" firestore:"email"`
	DisplayName string     `json:"displayName" firestore:"displayName"`
	PhotoURL    string     `json:"photoURL" firestore:"photoURL"`
	Type        GuiverType `json:"type" firestore:"type"`
	Bio         string     `json:"bio" firestore:"bio"`
	WhatsApp    string     `json:"whatsApp,omitempty" firestore:"whatsApp,omitempty"`
	Instagram   string     `json:"instagram,omitempty" firestore:"instagram,omitempty"`
	CreatedAt   time.Time  `json:"createdAt" firestore:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt" firestore:"updatedAt"`
}
