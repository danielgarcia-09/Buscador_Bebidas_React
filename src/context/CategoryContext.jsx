import axios from "axios";
import { createContext, useEffect, useState } from "react";

//* Creating context
export const CategoryContext = createContext();

//* Provider is functions and state for context
const CategoryProvider = (props) => {

    //* create context state
    const [ categories, saveCategories ] = useState([]);

    //* When context loads first time call API
    useEffect(()=> {
        const obtainCategories = async() => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categories = await axios.get(url);

            saveCategories(categories.data.drinks);
        }
        obtainCategories();
    }, [])

    return (
        <CategoryContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
}
export default CategoryProvider;