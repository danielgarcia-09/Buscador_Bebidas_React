import CategoryProvider from "./context/CategoryContext";
import RecipesProvider from "./context/RecipesContext";
import Form from "./components/Form";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import ModalProvider from "./context/ModalContext";

function App() {
  return (
    <CategoryProvider>
      <RecipesProvider>
        <ModalProvider>
          <Header />

          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>

            <RecipeList />
          </div>
        </ModalProvider>
      </RecipesProvider>
    </CategoryProvider>
  );
}

export default App;
