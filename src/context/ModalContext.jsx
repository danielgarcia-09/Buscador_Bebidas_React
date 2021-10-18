import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  //* State provider
  const [idRecipe, saveIdRecipe] = useState(null);

  //* Recipe state
  const [ recipeDetail, saveRecipe ] = useState({});

  //* once we get idRecipe, we call API
  useEffect(() => {
    if (idRecipe != null) {
      const obtainRecipeDetails = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

        const recipeDetails = await axios.get(url);

        saveRecipe(recipeDetails.data.drinks[0]);
      };
      obtainRecipeDetails();
    }
  }, [idRecipe]);

  return (
    <ModalContext.Provider
      value={{
        recipeDetail,
        saveIdRecipe,
        saveRecipe
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
