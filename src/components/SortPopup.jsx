import React, { useEffect, useRef, useState } from "react";

const SortPopup = React.memo(function SortPopup({
    items,
    onClickSort,
    activeSort
}) {

    const {name} = items.find(item => item.type === activeSort)
    const [popupOpen, setPopupOpen] = useState(false);
    const sortRef = useRef();
    const sortRef2 = useRef();

    const sortClick = (index) => {
        setPopupOpen(false);
        onClickSort(index);
    };

    const handleOutsideClick = (e) => {
        if (
            !e.composedPath().includes(sortRef.current) &&
            !e.composedPath().includes(sortRef2.current)
        ) {
            setPopupOpen(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => document.body.removeEventListener("click", handleOutsideClick);
    }, []);
    return (
        <div className="sort">
            <div className="sort__label">
                <svg
                    className={popupOpen ? "rotated" : ""}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span ref={sortRef2} onClick={() => setPopupOpen(!popupOpen)}>
                    {name}
                </span>
            </div>
            {popupOpen && (
                <div ref={sortRef} className="sort__popup">
                    <ul>
                        {items.map((sort, index) => (
                            <li
                                key={sort.name}
                                onClick={() => sortClick(index)}
                                className={activeSort === sort.type ? "active" : ""}
                            >
                                {sort.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default SortPopup;
