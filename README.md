# TP — Plateforme Microservices avec NestJS

> Plateforme distribuée de gestion de commandes démontrant l'usage combiné de REST, GraphQL, gRPC et Kafka dans une architecture microservices moderne.

---

## Table des matières

- [Stack technique](#stack-technique)
- [Architecture globale](#architecture-globale)
- [Services](#services)
- [Demarrage](#Demarrage)


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
├── images/                     # containing Postman test images
├── docker-compose.yml          # Docker Compose Kafka
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

## Demarrage

### Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 8
- [Docker](https://www.docker.com/) & Docker Compose




### Installation

Cloner le dépôt, puis installer toutes les dépendances du monorepo :

```bash
pnpm install
```

---

### Configuration

#### Variables d'environnement

```bash
mv .env.exemple .env
```

---


#### 1. Lancer l'infrastructure (Kafka + Kafdrop + postgres)

```bash
docker compose up -d
```

> [Kafdrop](https://github.com/obsidiandynamics/kafdrop) est disponible sur `http://localhost:9000` pour visualiser les topics Kafka.

### Migrations de base de données

Générer et appliquer les migrations Drizzle :

```bash
# Générer les fichiers de migration
pnpm drizzle-kit generate

# Appliquer les migrations
pnpm drizzle-kit migrate
```


#### 2. Lancer tous les services

```bash
# Windows
start-services.bat
```
or manually ( recommanded )
 
 ```bash
nest start catalog-service --watch
nest start notification-service --watch
nest start order-service --watch
nest start query-service --watch
nest start stock-service --watch
nest start api-gateway --watch
```

---



## Ressources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Apollo Federation](https://www.apollographql.com/docs/federation/)
- [Apache Kafka](https://kafka.apache.org/documentation/)
- [gRPC](https://grpc.io/docs/)