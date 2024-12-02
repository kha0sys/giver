@echo off
CompileDaemon -command="go run cmd/main.go" -build="go build cmd/main.go" -pattern=".go$"
