const baseRequest = "http://localhost:3000/ingredients";

export const getIngredients = () => {
    return fetch(`${baseRequest}`).then((res) => res.json());
}

export const getIngredient = (id) => {
    return fetch(`${baseRequest}/${id}`).then((res) => res.json());
}