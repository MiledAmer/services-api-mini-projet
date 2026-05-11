# TP — Plateforme Microservices avec NestJS

> Plateforme distribuée de gestion de commandes démontrant l'usage combiné de REST, GraphQL, gRPC et Kafka dans une architecture microservices moderne.

---

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Stack technique](#stack-technique)
- [Architecture globale](#architecture-globale)
- [Services](#services)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Migrations de base de données](#migrations-de-base-de-données)

---

## Vue d'ensemble

Ce TP illustre la conception d'une architecture microservices complète autour d'un système de commandes. Chaque service est découplé, responsable d'un domaine métier précis, et communique via le protocole le plus adapté à son cas d'usage :

| Protocole | Cas d'usage dans ce projet |
|-----------|---------------------------|
| **REST** | CRUD produits & commandes (client ↔ services) |
| **GraphQL** | Agrégation de lectures multi-sources |
| **gRPC** | Validation de stock synchrone inter-services |
| **Kafka** | Propagation d'événements asynchrone (ex. : commande créée) |

---

## Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | NestJS (monorepo) |
| Langage | TypeScript |
| Base de données | PostgreSQL |
| ORM | Drizzle ORM |
| API GraphQL | Apollo GraphQL (Federation) |
| Communication RPC | gRPC |
| Message broker | Apache Kafka |
| Conteneurisation | Docker / Docker Compose |
| Gestionnaire de paquets | pnpm |

---

## Structure du monorepo

```
.
├── apps/
│   ├── catalog-service/
│   ├── order-service/
│   ├── stock-service/
│   ├── notification-service/
│   ├── query-service/
│   ├── api-gateway/
│   └── drizzle/
├── kafka-kafdrop/          # Docker Compose Kafka
├── start-services.bat
└── postman-docs.json
```

---

## Services

| Service | Rôle | Protocoles |
|---|---|---|
| `catalog-service` | Gestion du catalogue produits | REST · PostgreSQL |
| `order-service` | Création et suivi des commandes | REST · gRPC · Kafka |
| `stock-service` | Validation et réservation du stock | gRPC |
| `notification-service` | Consommation des événements métier | Kafka |
| `query-service` | Agrégation des données en lecture | GraphQL |
| `api-gateway` | Point d'entrée unifié *(optionnel)* | GraphQL Federation |

---

## Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 8
- [Docker](https://www.docker.com/) & Docker Compose

---

## Installation

Cloner le dépôt, puis installer toutes les dépendances du monorepo :

```bash
pnpm install
```

---

## Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine (ou dans chaque service) avec les variables suivantes :

```env
DATABASE_URL=postgresql://postgres:postgres_pwd@localhost:5431/postgres
```

> Adapter les identifiants selon votre environnement local.

---

## Démarrage

### 1. Lancer l'infrastructure (Kafka + Kafdrop)

```bash
cd kafka-kafdrop
docker compose up -d
```

> [Kafdrop](https://github.com/obsidiandynamics/kafdrop) est disponible sur `http://localhost:9000` pour visualiser les topics Kafka.

### 2. Lancer tous les services

```bash
# Windows
start-services.bat
```

---

## Migrations de base de données

Générer et appliquer les migrations Drizzle :

```bash
# Générer les fichiers de migration
pnpm drizzle-kit generate

# Appliquer les migrations
pnpm drizzle-kit migrate
```


## Ressources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Apollo Federation](https://www.apollographql.com/docs/federation/)
- [Apache Kafka](https://kafka.apache.org/documentation/)
- [gRPC](https://grpc.io/docs/)