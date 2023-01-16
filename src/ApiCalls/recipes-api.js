const baseRequest = "http://localhost:3000/recipes";

export const getRecipes = () => {
    let d = fetch(`${baseRequest}`).then((res) => res.json())
    return d;
}

export const getRecipe = (id) => {
    return fetch(`${baseRequest}/${id}`).then((res) => res.data);
}