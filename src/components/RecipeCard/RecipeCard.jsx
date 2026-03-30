import styles from './RecipeCard.module.css'

const CATEGORY_THEMES = {
  Pasta:     { bg: '#fde8d0', accent: '#e8692a', label: '#7a3010' },
  Main:      { bg: '#d6ecd6', accent: '#2d7a3a', label: '#144020' },
  Soup:      { bg: '#d0e4f5', accent: '#2a62a8', label: '#0f3060' },
  Salad:     { bg: '#e2f5d0', accent: '#4a9a28', label: '#245012' },
  Dessert:   { bg: '#f5d6e8', accent: '#b83a70', label: '#6a1040' },
  Breakfast: { bg: '#fff3cc', accent: '#c8820a', label: '#6a4200' },
}

const DEFAULT_THEME = { bg: '#ede8df', accent: '#6b5e50', label: '#2a2018' }

export default function RecipeCard({ recipe, isFavorite = false, onToggleFavorite }) {
  const theme = CATEGORY_THEMES[recipe.category] || DEFAULT_THEME

  return (
    <article
      className={`${styles.card} ${isFavorite ? styles.favorited : ''}`}
      style={{ '--card-bg': theme.bg, '--card-accent': theme.accent, '--card-label': theme.label }}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={recipe.image} alt={recipe.name} />
        <div className={styles.imageOverlay} />
        <span className={styles.badge}>{recipe.category}</span>
        <button
          type="button"
          className={`${styles.favBtn} ${isFavorite ? styles.favActive : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{recipe.name}</h2>
        <div className={styles.footer}>
          <div className={styles.meta}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{recipe.duration} min</span>
          </div>
          <div className={styles.ingredients}>
            {recipe.ingredients.length} ingrédients
          </div>
        </div>
      </div>
    </article>
  )
}