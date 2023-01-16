import { useState } from "react";
import { useEffect } from "react";
import { getRecipes } from '../ApiCalls/recipes-api';
import { Container, Button, Card, Modal, Image } from "react-bootstrap";
import RecipeGrid from "../RecipeGrid/RecipeGridComponent";
import './MainPageStyle.css';

const MainPage = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => { getRecipes().then((data) => setRecipes(data)) }, []);

    const RecipeCell = props => {
        const { id, name, description, instructions, ingredients, imagePath } = props

        return (
            <Card className="recipeCard">
                <Card.Body>
                    <Card.Img src={`/Images/${imagePath}`} alt="Card image" />
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleShow(id, name, description, instructions, ingredients, imagePath)}>Instructions</Button>
                </Card.Body>
            </Card>
        )
    }

    const [show, setShow] = useState(false);
    const [recipeId, setRecipeId] = useState(0);
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeInstructions, setRecipeInstructions] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeImagePath, setRecipeImagePath] = useState("0");

    const handleClose = () => setShow(false);
    const handleShow = (id, name, description, instructions, ingredients, imagePath) => {
        setRecipeId(id);
        setRecipeName(name);
        setRecipeDescription(description);
        setRecipeInstructions(instructions);
        setRecipeIngredients(ingredients);
        setRecipeImagePath(imagePath);
        setShow(true);
    }
    return (
        <div>
            <Modal
                show={show}
                backdrop="static"
                onHide={handleClose}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {recipeName} </Modal.Title>
                </Modal.Header>
                <Image src={`/Images/${recipeImagePath}`}></Image>
                <Modal.Body>
                    <h3>Description</h3>

                    {recipeDescription}
                </Modal.Body>
                <Modal.Body>
                    <h3>Instructions:</h3>

                    {recipeInstructions}
                </Modal.Body>
                <Modal.Body>
                    <h3>Ingredients:</h3>
                    {recipeIngredients.map(ingr => <li key={ingr[0]}>Ingredient: {ingr[1]}  Quantity: {ingr[2]} {ingr[3]}</li>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Container className="recipeContainer">
                <RecipeGrid colCount={3} sm={true}>
                    {recipes ? recipes.map(item =>
                        <RecipeCell
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            instructions={item.instruction}
                            ingredients={item.ingredients.map(ingr => [ingr.id, ingr.name, ingr.quantity, ingr.unit])}
                            imagePath={item.imagePath}
                        >
                        </RecipeCell>)
                        :
                        <h6>No recipes to display!</h6>
                    }
                </RecipeGrid>
            </Container>
        </div>
    );
}

export default MainPage;