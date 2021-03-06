// Code generated by MockGen. DO NOT EDIT.
// Source: repositories/characterRepository.go

// Package mock_repositories is a generated GoMock package.
package mocks

import (
	gomock "github.com/golang/mock/gomock"
	models "github.com/renant/my-hero-api/models"
	reflect "reflect"
)

// MockCharacterRepository is a mock of CharacterRepository interface
type MockCharacterRepository struct {
	ctrl     *gomock.Controller
	recorder *MockCharacterRepositoryMockRecorder
}

// MockCharacterRepositoryMockRecorder is the mock recorder for MockCharacterRepository
type MockCharacterRepositoryMockRecorder struct {
	mock *MockCharacterRepository
}

// NewMockCharacterRepository creates a new mock instance
func NewMockCharacterRepository(ctrl *gomock.Controller) *MockCharacterRepository {
	mock := &MockCharacterRepository{ctrl: ctrl}
	mock.recorder = &MockCharacterRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockCharacterRepository) EXPECT() *MockCharacterRepositoryMockRecorder {
	return m.recorder
}

// GetAll mocks base method
func (m *MockCharacterRepository) GetAll() ([]models.Character, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetAll")
	ret0, _ := ret[0].([]models.Character)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetAll indicates an expected call of GetAll
func (mr *MockCharacterRepositoryMockRecorder) GetAll() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetAll", reflect.TypeOf((*MockCharacterRepository)(nil).GetAll))
}

// GetById mocks base method
func (m *MockCharacterRepository) GetById(id string) (*models.Character, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetById", id)
	ret0, _ := ret[0].(*models.Character)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetById indicates an expected call of GetById
func (mr *MockCharacterRepositoryMockRecorder) GetById(id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetById", reflect.TypeOf((*MockCharacterRepository)(nil).GetById), id)
}
