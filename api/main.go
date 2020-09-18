package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/renant/my-hero-api/controllers"
	"github.com/renant/my-hero-api/database"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	app := fiber.New()

	characterController := controllers.NewCharactersController(database.GetCharactersCollection())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/character/:characterId", characterController.GetCharactersById)

	app.Listen(":3000")
}
