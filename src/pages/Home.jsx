import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories, PizzaItem, SortPopup } from "../components";
import FakePizza from "../components/FakePizza";
import { addPizza } from "../redux/actions/cart";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";

const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sorts = [
    { name: "популярности", type: "rating" },
    { name: "цене", type: "price" },
    { name: "алфавиту", type: "name" },
];

function Home() {
    const dispatch = useDispatch();
    const { items, isLoading } = useSelector((state) => state.pizzas);
    const { category, sortBy } = useSelector((state) => state.filters);
    const cartItems = useSelector((state) => state.cart.items);

    React.useEffect(() => {
        dispatch(fetchPizzas(category, sortBy));
    }, [category, sortBy]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    const onSelectSort = React.useCallback((index) => {
        dispatch(setSortBy(sorts[index].type));
    }, []);

    const addPizzaToCart = (obj) => {
        dispatch(addPizza(obj));
    };

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories
                        activeCategory={category}
                        items={categories}
                        onClickCategory={onSelectCategory}
                    />
                    <SortPopup
                        activeSort={sortBy}
                        items={sorts}
                        onClickSort={onSelectSort}
                    />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? Array(10)
                              .fill(0)
                              .map((_, index) => <FakePizza key={index} />)
                        : items.map((pizza) => (
                              <PizzaItem
                                  {...pizza}
                                  addedCount={cartItems[pizza.id]?.totalCount}
                                  key={pizza.id}
                                  addPizza={addPizzaToCart}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
