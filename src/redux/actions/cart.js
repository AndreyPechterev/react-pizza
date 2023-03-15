export const addPizza = (pizzaItem) => ({
    type: "ADD_PIZZA",
    payload: pizzaItem,
});
export const clearCart = () => ({
    type: "CLEAR_CART",
});

export const removePizzaBlock = (obj) => ({
    type: 'REMOVE_PIZZA_BLOCK',
    payload: obj
})
export const removePizza = (obj) => ({
    type: 'REMOVE_PIZZA',
    payload: obj
})