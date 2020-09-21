package services

import (
	"errors"
	"os"
	"strconv"
	"strings"

	"github.com/renant/my-hero-api/models"
	"github.com/renant/my-hero-api/repositories"
)

type ICharacterService interface {
	GetAll(params map[string]interface{}) (*models.PaginationResult, error)
}

type CharacterService struct {
	CharacterRepository repositories.CharacterRepository
}

func NewCharacterService(characterResponseRepository repositories.CharacterRepository) *CharacterService {
	return &CharacterService{
		CharacterRepository: characterResponseRepository,
	}
}

func (s *CharacterService) GetAll(params map[string]interface{}) (*models.PaginationResult, error) {

	sliceCharacters, err := s.CharacterRepository.GetAll()

	sliceCharacters = setImageBaseUrl(sliceCharacters)

	pageSize := 20
	page := 1

	if err != nil {
		return nil, err
	}

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

func filterByAffiliation(slice []models.Character, affiliation string) []models.Character {

	tmp := slice[:0]
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
	}
	if sliceLength%pageSize != 0 {
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

func setImageBaseUrl(slice []models.Character) []models.Character {
	baseURL := os.Getenv("BASE_URL")

	for index, character := range slice {
		for indexImage, image := range character.Images {
			character.Images[indexImage] = baseURL + image
		}
		slice[index] = character
	}

	return slice
}
