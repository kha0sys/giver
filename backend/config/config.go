package config

import (
	"os"
	"strconv"
)

// Config contiene la configuración de la aplicación
type Config struct {
	Server   ServerConfig
	Firebase FirebaseConfig
	Cors     CorsConfig
}

// ServerConfig contiene la configuración del servidor
type ServerConfig struct {
	Port int
	Mode string // debug, release
}

// FirebaseConfig contiene la configuración de Firebase
type FirebaseConfig struct {
	CredentialsFile string
}

// CorsConfig contiene la configuración de CORS
type CorsConfig struct {
	AllowOrigins []string
	AllowHeaders []string
}

// LoadConfig carga la configuración desde variables de entorno
func LoadConfig() *Config {
	return &Config{
		Server: ServerConfig{
			Port: getEnvAsInt("PORT", 8080),
			Mode: getEnv("GIN_MODE", "debug"),
		},
		Firebase: FirebaseConfig{
			CredentialsFile: getEnv("FIREBASE_CREDENTIALS", "config/serviceAccountKey.json"),
		},
		Cors: CorsConfig{
			AllowOrigins: []string{"http://localhost:3000", "https://guiver-84885.web.app"},
			AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
		},
	}
}

// Helper functions
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value, exists := os.LookupEnv(key); exists {
		if intVal, err := strconv.Atoi(value); err == nil {
			return intVal
		}
	}
	return defaultValue
}
