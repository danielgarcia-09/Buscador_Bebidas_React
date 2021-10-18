import { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { RecipesContext } from "../context/RecipesContext";

const Form = () => {

    const { categories } = useContext(CategoryContext);

    const { searchRecipe, consumeAPI } = useContext(RecipesContext);

    //* local state
    const [ search, saveSearch ] = useState({
        name: '',
        category: ''
    });

    //* reading input func
    const obtainRecipeData = e => {
        saveSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    return (
        <form 
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                searchRecipe(search);
                consumeAPI(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por Categoria o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="Buscarpor ingrediente"
                        onChange={obtainRecipeData}
                        required
                    />
                </div>
                <div className="col-md-4">
                   <select
                        className="form-control"
                        name="category"
                        onChange={obtainRecipeData}
                        required
                   >
                       <option value="">-- Selecciona Categoria --</option>
                       {categories.map( category => (
                           <option
                                key={category.strCategory}
                                value={category.strCategory}
                           >
                               {category.strCategory}
                           </option>
                       ))}
                   </select> 
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebida"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default Form;