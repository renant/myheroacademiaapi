package main

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	"github.com/patrickmn/go-cache"
	cacherepositories "github.com/renant/my-hero-api/cacheRepositories"
	"github.com/renant/my-hero-api/controllers"
	"github.com/renant/my-hero-api/database"
	"github.com/renant/my-hero-api/repositories"
	"github.com/renant/my-hero-api/services"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	app := fiber.New()

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET",
	}))

	c := cache.New(5*time.Minute, 10*time.Minute)
	cacheRepository := cacherepositories.NewMemoryCacheRepository(c)

	characterRepository := repositories.NewFireStoreCharacterRepository(database.GetCharactersCollection())
	characterService := services.NewCharacterService(characterRepository, cacheRepository)
	characterController := controllers.NewCharactersController(characterService)

	app.Static("/", "../frontend/out")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendFile("../frontend/out/index.html")
	})

	api := app.Group("/api")

	api.Get("/character/:characterId", characterController.GetCharactersById)
	api.Get("/character", characterController.GetCharacters)

	app.Listen(":4000")
}
