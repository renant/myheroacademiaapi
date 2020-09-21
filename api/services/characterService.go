package services

import (
	"strings"

	"github.com/renant/my-hero-api/models"
	"github.com/renant/my-hero-api/repositories"
)

type ICharacterService interface {
	GetAll(params map[string]interface{}) (models.PaginationResult, error)
}

type CharacterService struct {
	CharacterRepository repositories.CharacterRepository
}

func NewCharacterService(characterResponseRepository repositories.CharacterRepository) *CharacterService {
	return &CharacterService{
		CharacterRepository: characterResponseRepository,
	}
}

func (s *CharacterService) GetAll(params map[string]interface{}) (models.PaginationResult, error) {

	sliceCharacters, err := s.CharacterRepository.GetAll()

	if err != nil {
		return models.PaginationResult{
			Result: nil,
		}, err
	}

	if params == nil {
		return models.PaginationResult{
			Result: sliceCharacters,
			Info: models.Info{
				Count: 1,
				Pages: 2,
			},
		}, nil
	}

	if name, ok := params["name"]; ok {
		sliceCharacters = filterByName(sliceCharacters, name.(string))
	}

	if alias, ok := params["alias"]; ok {
		sliceCharacters = filterByAlias(sliceCharacters, alias.(string))
	}

	if quirk, ok := params["quirk"]; ok {
		sliceCharacters = filterByQuirk(sliceCharacters, quirk.(string))
	}

	if occupation, ok := params["occupation"]; ok {
		sliceCharacters = filterByOccupation(sliceCharacters, occupation.(string))
	}

	return models.PaginationResult{
		Result: sliceCharacters,
	}, nil
}

func filterByName(slice []models.Character, name string) []models.Character {

	tmp := slice[:0]
	for _, v := range slice {
		if v.Name == nil {
			continue
		}
		if strings.Contains(strings.ToLower(*v.Name), strings.ToLower(name)) {
			tmp = append(tmp, v)
		}
	}

	return tmp
}

func filterByAlias(slice []models.Character, alias string) []models.Character {

	tmp := slice[:0]
	for _, v := range slice {
		if v.Alias == nil {
			continue
		}
		if strings.Contains(strings.ToLower(*v.Alias), strings.ToLower(alias)) {
			tmp = append(tmp, v)
		}
	}

	return tmp
}

func filterByQuirk(slice []models.Character, quirk string) []models.Character {

	tmp := slice[:0]
	for _, v := range slice {
		if v.Quirk == nil {
			continue
		}
		if strings.Contains(strings.ToLower(*v.Quirk), strings.ToLower(quirk)) {
			tmp = append(tmp, v)
		}
	}

	return tmp
}

func filterByOccupation(slice []models.Character, occupation string) []models.Character {

	tmp := slice[:0]
	for _, v := range slice {
		if v.Occupation == nil {
			continue
		}
		if strings.Contains(strings.ToLower(*v.Occupation), strings.ToLower(occupation)) {
			tmp = append(tmp, v)
		}
	}

	return tmp
}
