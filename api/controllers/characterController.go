package controllers

import (
	"fmt"

	"github.com/renant/my-hero-api/services"

	"github.com/gofiber/fiber/v2"
)

type CharacterController struct {
	CharacterService services.ICharacterService
}

func NewCharactersController(characterService services.ICharacterService) *CharacterController {
	return &CharacterController{
		CharacterService: characterService,
	}
}

func (cc *CharacterController) GetCharactersById(c *fiber.Ctx) error {
	characterID := c.Params("characterId")

	character, err := cc.CharacterService.GetById(characterID)

	if err == nil && character == nil {
		c.Status(404).JSON(map[string]string{"message": "character not found"})
		return nil
	}

	if err != nil {
		fmt.Println(character)
		c.Status(500).JSON(map[string]string{"message": err.Error()})
		return nil
	}

	c.Status(200).JSON(character)
	return nil
}

func (cc *CharacterController) GetCharacters(c *fiber.Ctx) error {
	params := make(map[string]interface{})

	nameParam := c.Query("name")
	if nameParam != "" {
		params["name"] = nameParam
	}

	aliasParam := c.Query("alias")
	if aliasParam != "" {
		params["alias"] = aliasParam
	}

	quirkParam := c.Query("quirk")
	if quirkParam != "" {
		params["quirk"] = quirkParam
	}

	occupation := c.Query("occupation")
	if occupation != "" {
		params["occupation"] = occupation
	}

	affiliation := c.Query("affiliation")
	if affiliation != "" {
		params["affiliation"] = affiliation
	}

	page := c.Query("page")
	if page != "" {
		params["page"] = page
	}

	characters, err := cc.CharacterService.GetAll(params)

	if err != nil {
		c.Status(500).JSON(map[string]string{"message": "Error on get characters - " + err.Error()})
		return nil
	}

	c.Status(200).JSON(characters)
	return nil
}
