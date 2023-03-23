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
    const fetchSort = `_sort=${sorted}&_order=asc`;
    dispatch(setLoading(false));
    axios
        .get(
            `http://localhost:3001/pizzas
?${fetchCategory}&${fetchSort}`
        )
        .then((res) => dispatch(setPizzas(res.data)));
    dispatch(setLoading(true));
};
