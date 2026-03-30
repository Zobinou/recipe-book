import RecipeCard from '../RecipeCard/RecipeCard.jsx'
import styles from './List.module.css'

export default function FavoritesList({ recipes, favoriteIds, onToggleFavorite }) {
  const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id))

  if (favoriteRecipes.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyHeart}>♡</div>
        <p className={styles.emptyText}>Aucun favori pour le moment</p>
        <p className={styles.emptyHint}>Appuie sur le cœur d'une recette pour la sauvegarder ici.</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {favoriteRecipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard recipe={recipe} isFavorite={true} onToggleFavorite={onToggleFavorite} />
        </li>
      ))}
    </ul>
  )
}