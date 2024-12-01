package router

import (
	"github.com/gin-gonic/gin"
	"github.com/guiver/config"
	"github.com/guiver/internal/delivery/http/handlers"
	"github.com/guiver/internal/middleware"
)

// Router maneja la configuración de rutas de la API
type Router struct {
	config        *config.Config
	engine        *gin.Engine
	guiverHandler *handlers.GuiverHandler
	causeHandler  *handlers.CauseHandler
	productHandler *handlers.ProductHandler
}

// NewRouter crea una nueva instancia del router
func NewRouter(
	cfg *config.Config,
	guiverHandler *handlers.GuiverHandler,
	causeHandler *handlers.CauseHandler,
	productHandler *handlers.ProductHandler,
) *Router {
	gin.SetMode(cfg.Server.Mode)
	engine := gin.New()

	return &Router{
		config:        cfg,
		engine:        engine,
		guiverHandler: guiverHandler,
		causeHandler:  causeHandler,
		productHandler: productHandler,
	}
}

// Setup configura las rutas y middleware
func (r *Router) Setup() {
	// Middleware global
	r.engine.Use(middleware.LoggerMiddleware())
	r.engine.Use(middleware.CorsMiddleware(r.config.Cors))
	r.engine.Use(gin.Recovery())

	// API routes
	api := r.engine.Group("/api/v1")
	{
		// Rutas públicas
		public := api.Group("")
		{
			// Health check
			public.GET("/health", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"status": "ok",
					"time":   time.Now().Unix(),
				})
			})

			// Auth routes (se implementarán más tarde)
			auth := public.Group("/auth")
			{
				auth.POST("/login", handlers.Login)
				auth.POST("/register", handlers.Register)
			}
		}

		// Rutas protegidas
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			// Guiver routes
			r.guiverHandler.Register(protected)

			// Cause routes
			r.causeHandler.Register(protected)

			// Product routes
			r.productHandler.Register(protected)
		}
	}
}

// Run inicia el servidor HTTP
func (r *Router) Run() error {
	return r.engine.Run(fmt.Sprintf(":%d", r.config.Server.Port))
}
