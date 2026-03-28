import styles from './RecipeCard.module.css'

export default function RecipeCard({ recipe, isFavorite = false, onToggleFavorite }) {
  return (
    <article className={`${styles.card} ${isFavorite ? styles.favorited : ''}`}>
      <img className={styles.image} src={recipe.image} alt="" />
      <div className={styles.body}>
        <h2 className={styles.name}>{recipe.name}</h2>
        <span className={styles.badge}>{recipe.category}</span>
        <p className={styles.duration}>{recipe.duration} min</p>
        <button
          type="button"
          className={`${styles.fav} ${isFavorite ? styles.favActive : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          {isFavorite ? '♥ Favori' : '♡ Favori'}
        </button>
      </div>
    </article>
  )
}