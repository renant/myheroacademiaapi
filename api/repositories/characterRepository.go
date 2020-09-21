package repositories

import (
	"context"

	"cloud.google.com/go/firestore"
	"github.com/renant/my-hero-api/models"
)

type CharacterRepository interface {
	GetAll() ([]models.Character, error)
}

type FireStoreCharacterRepository struct {
	CharactersCollection *firestore.CollectionRef
}

func NewFireStoreCharacterRepository(charactersCollection *firestore.CollectionRef) *FireStoreCharacterRepository {
	return &FireStoreCharacterRepository{
		CharactersCollection: charactersCollection,
	}
}

func (r *FireStoreCharacterRepository) GetAll() ([]models.Character, error) {
	ctx := context.Background()
	iter := r.CharactersCollection.Documents(ctx)
	docsnap, err := iter.GetAll()
	if err != nil {
		return nil, err
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

	return sliceCharacters, nil
}
