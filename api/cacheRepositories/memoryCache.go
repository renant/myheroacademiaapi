package cacherepositories

import (
	"github.com/patrickmn/go-cache"
)

type CacheRepository interface {
	Get(key string) (interface{}, bool)
	Add(key string, value interface{}) error
}

type MemoryCacheRepository struct {
	Cache *cache.Cache
}

func NewMemoryCacheRepository(cache *cache.Cache) *MemoryCacheRepository {
	return &MemoryCacheRepository{
		Cache: cache,
	}
}

func (r *MemoryCacheRepository) Add(key string, value interface{}) error {
	return r.Cache.Add(key, value, cache.DefaultExpiration)
}

func (r *MemoryCacheRepository) Get(key string) (interface{}, bool) {
	return r.Cache.Get(key)
}
