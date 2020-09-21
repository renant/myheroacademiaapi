package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
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

	// c := cache.New(5*time.Minute, 10*time.Minute)
	characterRepository := repositories.NewFireStoreCharacterRepository(database.GetCharactersCollection())
	characterService := services.NewCharacterService(characterRepository)
	characterController := controllers.NewCharactersController(characterService)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/character/:characterId", characterController.GetCharactersById)
	app.Get("/character", characterController.GetCharacters)

	app.Listen(":3000")
}
