#!/bin/bash

# Desplegar índices
firebase deploy --only firestore:indexes

# Desplegar reglas
firebase deploy --only firestore:rules
