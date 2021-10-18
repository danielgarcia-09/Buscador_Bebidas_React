import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [recipes, saveRecipes] = useState([]);
  const [search, searchRecipe] = useState({
    name: "",
    category: "",
  });
  const [API, consumeAPI] = useState(false);

  const { name, category } = search;

  useEffect(() => {
    if (API) {
      const obtainRecipeAPI = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;

        const recipes = await axios.get(url);

        saveRecipes(recipes.data.drinks);
      };
      obtainRecipeAPI();
    }
  }, [search]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        searchRecipe,
        consumeAPI,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
