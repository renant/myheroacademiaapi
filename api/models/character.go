package models

type Character struct {
	ID            string       `firestore:"id" json:"id"`
	Name          *string      `firestore:"name" json:"name"`
	Alias         *string      `firestore:"alias" json:"alias"`
	Affiliation   *string      `firestore:"affiliation" json:"affiliation"`
	Birthday      *string      `firestore:"birthday" json:"birthday"`
	BloodType     *string      `firestore:"bloodtype" json:"bloodtype"`
	Description   *string      `firestore:"description" json:"description"`
	Fightingstyle *string      `firestore:"fightstyle" json:"fightstyle"`
	Gender        *string      `firestore:"gender" json:"gender"`
	Eye           *string      `firestore:"eye", json:"eye"`
	Hair          *string      `firestore:"hair" json:"hair"`
	Height        *string      `firestore:"height" json:"height"`
	Kanji         *string      `firestore:"kanji" json:"kanji"`
	Occupation    *string      `firestore:"occupation" json:"occupation"`
	Quirk         *string      `firestore:"quirk" json:"quirk"`
	Romaji        *string      `firestore:"romaji" json:"romaji"`
	Status        *string      `firestore:"status" json:"status"`
	Teams         *string      `firestore:"teams" json:"teams"`
	Images        []string     `firestore:"images" json:"images"`
	Epithet       *string      `firestore:"epithet" json:"epithet"`
	Ages          *interface{} `firestore:"ages" json:"ages"`
	Family        *interface{} `firestore:"family" json:"family"`
}
