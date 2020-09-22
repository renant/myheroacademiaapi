package services

import (
	"errors"
	"os"
	"strconv"
	"strings"

	"github.com/renant/my-hero-api/cacheRepositories"
	"github.com/renant/my-hero-api/models"
	"github.com/renant/my-hero-api/repositories"
)

type ICharacterService interface {
	GetById(id string) (*models.Character, error)
	GetAll(params map[string]interface{}) (*models.PaginationResult, error)
}

type CharacterService struct {
	CharacterRepository repositories.CharacterRepository
	Cache               cacheRepositories.CacheRepository
	BaseURL             string
}

func NewCharacterService(characterResponseRepository repositories.CharacterRepository, cache cacheRepositories.CacheRepository) *CharacterService {
	baseURL := os.Getenv("BASE_URL")
	return &CharacterService{
		CharacterRepository: characterResponseRepository,
		Cache:               cache,
		BaseURL:             baseURL,
	}
}

const cacheKeyCharacterById = "cache-key-character-by-id"

func (s *CharacterService) GetById(id string) (*models.Character, error) {

	cachevalue, found := s.Cache.Get(cacheKeyCharacterById + id)
	if found {
		return cachevalue.(*models.Character), nil
	}

	character, err := s.CharacterRepository.GetById(id)

	if err != nil {
		return nil, err
	}

	if character == nil {
		return nil, nil
	}

	character = setimageBaseURLCharacter(character, s.BaseURL)
	s.Cache.Add(cacheKeyCharacterById+id, character)
	return character, nil
}

const cacheKeyGetAll = "cache-key-get-all-characters"

func (s *CharacterService) GetAll(params map[string]interface{}) (*models.PaginationResult, error) {

	var sliceCharacters []models.Character

	cacheValue, found := s.Cache.Get(cacheKeyGetAll)
	if found {
		sliceCharacters = cacheValue.([]models.Character)
	} else {
		sliceAllCharacters, err := s.CharacterRepository.GetAll()
		if err != nil {
			return nil, err
		}

		sliceCharacters = setImageBaseURLToSlice(sliceAllCharacters, s.BaseURL)
		err = s.Cache.Add(cacheKeyGetAll, sliceCharacters)
		if err != nil {
			return nil, err
		}
	}

	pageSize := 20
	page := 1

	if params == nil {
		return paginateCharacters(sliceCharacters, page, pageSize), nil
	}

	if pageParam, ok := params["page"]; ok {
		x, err := strconv.Atoi(pageParam.(string))
		if err != nil {
			return nil, errors.New("Page must by a integer")
		}
		if x <= 0 {
			return nil, errors.New("Page must by greater than 0")
		}
		page = x
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

	if affiliation, ok := params["affiliation"]; ok {
		sliceCharacters = filterByAffiliation(sliceCharacters, affiliation.(string))
	}

	return paginateCharacters(sliceCharacters, page, pageSize), nil
}

func filterByName(slice []models.Character, name string) []models.Character {

	tmp := make([]models.Character, 0)
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

	tmp := make([]models.Character, 0)
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

	tmp := make([]models.Character, 0)
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

	tmp := make([]models.Character, 0)
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

func filterByAffiliation(slice []models.Character, affiliation string) []models.Character {

	tmp := make([]models.Character, 0)
	for _, v := range slice {
		if v.Affiliation == nil {
			continue
		}
		if strings.Contains(strings.ToLower(*v.Affiliation), strings.ToLower(affiliation)) {
			tmp = append(tmp, v)
		}
	}

	return tmp
}

func paginateCharacters(slice []models.Character, pageNum, pageSize int) *models.PaginationResult {
	sliceLength := len(slice)

	if pageNum <= 0 {
		pageNum = 1
	}

	start := (pageNum - 1) * pageSize

	if start > sliceLength {
		start = sliceLength
	}

	end := start + pageSize
	if end > sliceLength {
		end = sliceLength
	}

	pages := sliceLength / pageSize
	if pages == 0 {
		pages = 1
	} else if sliceLength%pageSize != 0 {
		pages++
	}

	return &models.PaginationResult{
		Info: models.Info{
			Count: sliceLength,
			Pages: pages,
		},
		Result: slice[start:end],
	}
}

func setImageBaseURLToSlice(slice []models.Character, baseURL string) []models.Character {
	for index, character := range slice {
		for indexImage, image := range character.Images {
			character.Images[indexImage] = baseURL + image
		}
		slice[index] = character
	}

	return slice
}

func setimageBaseURLCharacter(character *models.Character, baseURL string) *models.Character {
	for indexImage, image := range character.Images {
		character.Images[indexImage] = baseURL + image
	}
	return character
}
