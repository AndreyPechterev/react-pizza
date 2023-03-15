import React from "react";

const Categories = React.memo(function Categories({
    items,
    onClickCategory,
    activeCategory,
}) {
    return (
        <div className="categories">
            <ul>
                <li
                    className={activeCategory === null ? "active" : ""}
                    onClick={() => onClickCategory(null)}
                >
                    Все
                </li>
                {items &&
                    items.map((item, index) => (
                        <li
                            key={item}
                            onClick={() => onClickCategory(index)}
                            className={activeCategory === index ? "active" : ""}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    );
});

export default Categories;
