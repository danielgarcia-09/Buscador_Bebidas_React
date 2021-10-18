import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import Recipe from "./Recipe";

const RecipeList = () => {

    //* Extracting recipes from recipes context
    const { recipes } = useContext(RecipesContext);
    
    const ifRecipes = ( recipes ) ? (recipes.map( recipe => (
        <Recipe
            key={recipe.idDrink}
            recipe={recipe}
        />
    ))) : (<p>No hay bebidas</p>);
    
    return (
        <div className="row mt-5">
            {ifRecipes}
        </div>
    );
}
 
export default RecipeList;