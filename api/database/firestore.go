package database

import (
	"context"
	"os"

	"cloud.google.com/go/firestore"
)

func GetCharactersCollection() *firestore.CollectionRef {
	projectID := os.Getenv("GCP_PROJECT")

	if projectID == "" {
		projectID = os.Getenv("GOOGLE_CLOUD_PROJECT")
	}

	ctx := context.Background()
	client, err := firestore.NewClient(ctx, "my-hero-academia-app")
	if err != nil {
		// TODO: Handle error.
	}

	CharactersCollection := client.Collection("characters")
	return CharactersCollection
}
