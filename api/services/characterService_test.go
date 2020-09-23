package services_test

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/renant/my-hero-api/mocks"
	"github.com/renant/my-hero-api/models"
	"github.com/renant/my-hero-api/services"
)

func TestGetByIdShouldReturnFromCache(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	mockMemoryCache.EXPECT().Get("cache-key-character-by-idIzuku").Return(&models.Character{
		ID: "Izuku",
	}, true).Times(1)

	mockCharacterRepo.EXPECT().GetById("Izuku").Times(0)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	character, err := characterService.GetById("Izuku")

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if character.ID != "Izuku" {
		t.Errorf("character id expected Izuku")
	}
}

func TestGetByIdShouldReturnFromRepository(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	mockMemoryCache.EXPECT().Get("cache-key-character-by-idIzuku").Return(nil, false).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-character-by-idIzuku", gomock.Any()).Return(nil).Times(1)
	mockCharacterRepo.EXPECT().GetById("Izuku").Return(&models.Character{
		ID:     "Izuku",
		Images: []string{"image"},
	}, nil).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)
	character, err := characterService.GetById("Izuku")

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if character.ID != "Izuku" {
		t.Errorf("character id expected Izuku")
	}
}

func TestGetByIdShouldReturnErrorFromRepository(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	mockMemoryCache.EXPECT().Get("cache-key-character-by-idIzuku").Return(nil, false).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-character-by-idIzuku", gomock.Any()).Times(0)
	mockCharacterRepo.EXPECT().GetById("Izuku").Return(nil, errors.New("Error on get by id from repository")).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)
	character, err := characterService.GetById("Izuku")

	if character != nil {
		t.Errorf("Expected a nil character")
	}

	if err == nil {
		t.Errorf("Expected a error")
	}

	if err.Error() != "Error on get by id from repository" {
		t.Errorf("Expected a error on get by id from repository")
	}

}

func TestGetByIdShouldReturnNilCharacterromRepository(t *testing.T) {

	mockCharacterRepo, mockMemoryCache := createMocks(t)

	mockMemoryCache.EXPECT().Get("cache-key-character-by-idIzuku").Return(nil, false).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-character-by-idIzuku", gomock.Any()).Times(0)
	mockCharacterRepo.EXPECT().GetById("Izuku").Return(nil, nil).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)
	character, err := characterService.GetById("Izuku")

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if character != nil {
		t.Errorf("should return a nil character")
	}
}

func TestGetAllShouldReturnCharactersFromCache(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(charactersMock, true).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Times(0)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(0)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 317 || paginatiResult.Info.Pages != 16 {
		t.Errorf("Erron on generate pagination")
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 20 {
		t.Errorf("Error on paginate results")
	}
}

func TestGetAllShouldReturnCharactersFromRepository(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 317 ||
		paginatiResult.Info.Pages != 16 ||
		paginatiResult.Info.CurrentPage != 1 {
		t.Errorf("Erron on generate pagination")
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 20 {
		t.Errorf("Error on paginate results")
	}
}

func TestGetAllShouldReturnCharactersLastPageFromRepository(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	params["page"] = "16"

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 317 ||
		paginatiResult.Info.Pages != 16 ||
		paginatiResult.Info.CurrentPage != 16 {
		t.Errorf("Erron on generate pagination")
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 17 {
		t.Errorf("Error on paginate results %d", len(characters))
	}
}

func TestGetAllShouldReturnCharactersFilterByName(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	params["name"] = "Izuku"

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 1 ||
		paginatiResult.Info.Pages != 1 ||
		paginatiResult.Info.CurrentPage != 1 {
		t.Errorf("Erron on generate pagination")
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 1 {
		t.Errorf("Error on paginate results %d", len(characters))
	}
}

func TestGetAllShouldReturnCharactersFilterByAlias(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	params["alias"] = "All Might"

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 1 ||
		paginatiResult.Info.Pages != 1 ||
		paginatiResult.Info.CurrentPage != 1 {
		t.Errorf("Erron on generate pagination")
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 1 {
		t.Errorf("Error on paginate results %d", len(characters))
	}
}

func TestGetAllShouldReturnCharactersFilterByQuirk(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	params["quirk"] = "One For All"

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 3 ||
		paginatiResult.Info.Pages != 1 ||
		paginatiResult.Info.CurrentPage != 1 {
		t.Errorf("Erron on generate pagination")
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 3 {
		t.Errorf("Error on paginate results %d", len(characters))
	}
}

func TestGetAllShouldReturnCharactersFilterByOccupation(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	params["occupation"] = "Teacher"

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 12 ||
		paginatiResult.Info.Pages != 1 ||
		paginatiResult.Info.CurrentPage != 1 {
		t.Errorf("Erron on generate pagination %d", paginatiResult.Info)
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 12 {
		t.Errorf("Error on paginate results %d", len(characters))
	}
}

func TestGetAllShouldReturnCharactersFilterByAffiliation(t *testing.T) {
	mockCharacterRepo, mockMemoryCache := createMocks(t)

	charactersMock, err := getCharactersMockFromJson()
	params := make(map[string]interface{})

	params["affiliation"] = "U.A. High Schoo"

	if err != nil {
		t.Errorf("Error on mock values in testing")
	}

	mockMemoryCache.EXPECT().Get("cache-key-get-all-characters").Return(nil, false).Times(1)
	mockCharacterRepo.EXPECT().GetAll().Return(charactersMock, nil).Times(1)
	mockMemoryCache.EXPECT().Add("cache-key-get-all-characters", gomock.Any()).Times(1)

	characterService := services.NewCharacterService(mockCharacterRepo, mockMemoryCache)

	paginatiResult, err := characterService.GetAll(params)

	if err != nil {
		t.Errorf("dont throw any error")
	}

	if paginatiResult == nil {
		t.Errorf("Should get a paginatiResult")
	}

	if paginatiResult.Info.Count != 62 ||
		paginatiResult.Info.Pages != 4 ||
		paginatiResult.Info.CurrentPage != 1 {
		t.Errorf("Erron on generate pagination %d", paginatiResult.Info)
	}

	characters := paginatiResult.Result.([]models.Character)

	if len(characters) != 20 {
		t.Errorf("Error on paginate results %d", len(characters))
	}
}

func getCharactersMockFromJson() ([]models.Character, error) {
	jsonFile, err := os.Open("../mocks/characters_mock.json")

	if err != nil {
		return nil, err
	}

	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)

	if err != nil {
		return nil, err
	}

	var characters []models.Character
	json.Unmarshal(byteValue, &characters)

	return characters, nil
}

func createMocks(t *testing.T) (*mocks.MockCharacterRepository, *mocks.MockCacheRepository) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockCharacterRepo := mocks.NewMockCharacterRepository(ctrl)
	mockMemoryCache := mocks.NewMockCacheRepository(ctrl)

	return mockCharacterRepo, mockMemoryCache
}
