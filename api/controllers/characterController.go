package controllers

import (
	"context"

	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
)

type CharacterController struct {
	CharactersCollection *firestore.CollectionRef
}

func NewCharactersController(charactersCollection *firestore.CollectionRef) *CharacterController {
	return &CharacterController{
		CharactersCollection: charactersCollection,
	}
}

func (cc *CharacterController) GetCharactersById(c *fiber.Ctx) error {
	characterID := c.Params("characterId")

	ctx := context.Background()

	docRef := cc.CharactersCollection.Doc(characterID)
	docsnap, err := docRef.Get(ctx)
	if err != nil {
		c.Status(500).JSON(map[string]string{"message": err.Error()})
		return nil
	}
	dataMap := docsnap.Data()

	c.Status(200).JSON(dataMap)
	return nil
}
