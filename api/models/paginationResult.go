package models

type PaginationResult struct {
	Info   Info        `json:"info"`
	Result interface{} `json:"result"`
}

type Info struct {
	CurrentPage int `json:"currentPage"`
	Count       int `json:"count"`
	Pages       int `json:"pages"`
}
