import axios from "axios";
export const setPizzas = (items) => ({
    type: "SET_PIZZAS",
    payload: items,
});
export const setLoading = (bool) => ({
    type: "SET_LOADING",
    payload: bool,
});

export const fetchPizzas = (category, sorted) => (dispatch) => {
    const fetchCategory = category === null ? "" : `category=${category}`;
    const fetchSort = `sortBy=${sorted}&order=asc`;
    dispatch(setLoading(false));
    axios
        .get(
            `https://63f9de3e897af748dcc4cb3c.mockapi.io/items
?${fetchCategory}&${fetchSort}`
        )
        .then((res) => dispatch(setPizzas(res.data)));
    dispatch(setLoading(true));
};
