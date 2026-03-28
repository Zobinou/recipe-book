import { useState, useEffect } from 'react'

const STORAGE_KEY = 'recipe-favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((f) => f !== id))
  }

  function isFavorite(id) {
    return favorites.includes(id)
  }

  return { favorites, toggleFavorite, removeFavorite, isFavorite }
}