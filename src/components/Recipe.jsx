import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    maxHeight: "550px",
    overflowY: "scroll",
    overflowX: "none",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Recipe = ({ recipe }) => {
  //* Material-UI modal config
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //* Extracting modal context
  const { recipeDetail, saveIdRecipe, saveRecipe } = useContext(ModalContext);

  //* formatting and showing ingredients
  const showIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (recipe[`strIngredient${i}`] !== null) {
        ingredients.push(
          <li>
            {" "}
            {recipe[`strIngredient${i}`]}: {recipe[`strMeasure${i}`]}{" "}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>
        <img
          className="card-img-top"
          src={recipe.strDrinkThumb}
          alt={`Imagen de ${recipe.strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              saveIdRecipe(recipe.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              saveIdRecipe(null);
              saveRecipe({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{recipeDetail.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{recipeDetail.strInstructions}</p>

              <img
                className="img-fluid my-4"
                src={recipeDetail.strDrinkThumb}
                alt={`Imagen de ${recipe.strDrink}`}
              />

              <h3>Ingredientes y Cantidades</h3>
              {showIngredients(recipeDetail)}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
