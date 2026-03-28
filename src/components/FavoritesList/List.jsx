import RecipeCard from '../RecipeCard/RecipeCard.jsx'
import styles from './list.module.css'

export default function FavoritesList({ recipes, favoriteIds, onToggleFavorite }) {
  const favoriteRecipes = recipes.filter((r) => favoriteIds.includes(r.id))

  if (favoriteRecipes.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Aucun favori pour le moment.</p>
        <p className={styles.emptyHint}>Appuie sur ♥ sur une recette pour l'ajouter.</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {favoriteRecipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard
            recipe={recipe}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  )
}