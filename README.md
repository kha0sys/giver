# Guiver - Red Social de Crowdfunding

Plataforma de crowdfunding que conecta personas con causas y proyectos, facilitando el contacto directo entre usuarios.

## Estructura del Proyecto

```plaintext
├── backend/                 # Servidor Go
│   ├── cmd/                # Punto de entrada de la aplicación
│   ├── internal/           # Código privado de la aplicación
│   │   ├── domain/        # Entidades y reglas de negocio
│   │   ├── usecase/       # Casos de uso de la aplicación
│   │   ├── repository/    # Implementaciones de repositorios
│   │   └── delivery/      # Handlers HTTP y middleware
│   └── pkg/               # Código público que puede ser utilizado por otras aplicaciones
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── services/    # Servicios (Firebase, API)
│   │   ├── hooks/       # Custom hooks
│   │   ├── types/       # Definiciones de TypeScript
│   │   └── utils/       # Utilidades
│   └── public/          # Archivos estáticos
```

## Tecnologías

- Backend:
  - Go (Golang)
  - Clean Architecture
  - Firebase Admin SDK

- Frontend:
  - React
  - TypeScript
  - Firebase SDK
  - Material-UI/Tailwind (UI Framework)

## Características

- Autenticación de usuarios
- Publicación de proyectos/causas
- Perfil de usuario
- Búsqueda y filtrado de proyectos
- Contacto directo (WhatsApp, Instagram, Email)
- Almacenamiento de imágenes
- Sistema de categorías
