package controllers

import (
	"context"

	"github.com/renant/my-hero-api/models"

	"cloud.google.com/go/firestore"
	"github.com/gofiber/fiber/v2"
	"github.com/patrickmn/go-cache"
)

type CharacterController struct {
	CharactersCollection *firestore.CollectionRef
	Cache                *cache.Cache
}

func NewCharactersController(charactersCollection *firestore.CollectionRef, cache *cache.Cache) *CharacterController {
	return &CharacterController{
		CharactersCollection: charactersCollection,
		Cache:                cache,
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

const cacheListKey = "list-all-characters"

func (cc *CharacterController) GetCharacters(c *fiber.Ctx) error {
	// queryName := c.Query("name")

	ctx := context.Background()

	cacheList, found := cc.Cache.Get(cacheListKey)
	// found = false
	if found {
		characters := cacheList.([]models.Character)
		c.Status(200).JSON(characters)
		return nil
	}

	iter := cc.CharactersCollection.Documents(ctx)

	docsnap, err := iter.GetAll()
	if err != nil {
		c.Status(500).JSON(map[string]string{"message": err.Error()})
		return nil
	}

	sliceCharacters := make([]models.Character, 0)

	for _, value := range docsnap {
		var character models.Character
		err := value.DataTo(&character)
		if err != nil {
			continue
		}
		sliceCharacters = append(sliceCharacters, character)
	}

	cc.Cache.Set(cacheListKey, sliceCharacters, cache.DefaultExpiration)
	c.Status(200).JSON(sliceCharacters)
	return nil
}
