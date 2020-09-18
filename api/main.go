package main

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/patrickmn/go-cache"
	"github.com/renant/my-hero-api/controllers"
	"github.com/renant/my-hero-api/database"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	app := fiber.New()

	c := cache.New(5*time.Minute, 10*time.Minute)
	characterController := controllers.NewCharactersController(database.GetCharactersCollection(), c)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	})

	app.Get("/character/:characterId", characterController.GetCharactersById)
	app.Get("/character", characterController.GetCharacters)

	app.Listen(":3000")
}
