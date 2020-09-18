package models

type Character struct {
	Name string `firestore:"name" json:"name"`
}
