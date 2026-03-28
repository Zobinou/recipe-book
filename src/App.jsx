import { useState, useMemo } from 'react'
import recipes from './data/recipes.json'
import styles from './App.module.css'
import RecipeList from './components/RecipeList/RecipeList.jsx'
import FavoritesList from './components/FavoritesList/List.jsx';
import useFavorites from './hooks/useFavorites.js'

const CATEGORIES = ['Toutes', ...new Set(recipes.map((r) => r.category))]

export default function App() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [view, setView] = useState('all')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Toutes')
  const { favorites, toggleFavorite } = useFavorites()

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  const filteredRecipes = useMemo(() => {
    return orderedRecipes.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === 'Toutes' || r.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [orderedRecipes, search, activeCategory])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <div className={styles.controls}>
            <nav className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tab} ${view === 'all' ? styles.tabActive : ''}`}
                onClick={() => setView('all')}
              >
                Toutes les recettes
              </button>
              <button
                type="button"
                className={`${styles.tab} ${view === 'favorites' ? styles.tabActive : ''}`}
                onClick={() => setView('favorites')}
              >
                ♥ Favoris {favorites.length > 0 && `(${favorites.length})`}
              </button>
            </nav>
            {view === 'all' && (
              <button
                type="button"
                className={styles.toggle}
                onClick={handleToggleOrder}
              >
                Inverser l'ordre
              </button>
            )}
          </div>
        </div>

        {view === 'all' && (
          <div className={styles.filterRow}>
            <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="11" cy="11" r="8"/>
  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
</svg>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Rechercher une recette..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearch('')}
                  aria-label="Effacer"
                >
                  ✕
                </button>
              )}
            </div>
            <div className={styles.categories}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className={styles.main}>
        {view === 'all' ? (
          <>
            {filteredRecipes.length === 0 ? (
              <div className={styles.noResults}>
                <p>Aucune recette trouvée pour "<strong>{search}</strong>".</p>
              </div>
            ) : (
              <RecipeList
                recipes={filteredRecipes}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </>
        ) : (
          <FavoritesList
            recipes={recipes}
            favoriteIds={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  )
}