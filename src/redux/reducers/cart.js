const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const cart = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PIZZA": {
            const type = action.payload.type;
            const size = action.payload.size;
            const id = action.payload.id;
            const price = action.payload.price;
            return {
                ...state,
                totalPrice: state.totalPrice + price,
                totalCount: state.totalCount + 1,
                items: {
                    ...state.items,
                    [id]: state.items[id]
                        ? {
                              ...state.items[id],
                              totalCount: state.items[id].totalCount + 1,
                              totalPrice: state.items[id].totalPrice + price,
                              items: {
                                  ...state.items[id].items,
                                  [`${size}${type}`]: state.items[id].items[
                                      `${size}${type}`
                                  ]
                                      ? {
                                            ...state.items[id].items[
                                                `${size}${type}`
                                            ],
                                            totalCount:
                                                state.items[id].items[
                                                    `${size}${type}`
                                                ].totalCount + 1,
                                            totalPrice:
                                                state.items[id].items[
                                                    `${size}${type}`
                                                ].totalPrice + price,
                                        }
                                      : {
                                            ...action.payload,
                                            totalCount: 1,
                                            totalPrice: price,
                                        },
                              },
                          }
                        : {
                              items: {
                                  [`${size}${type}`]: {
                                      ...action.payload,
                                      totalCount: 1,
                                      totalPrice: price,
                                  },
                              },
                              totalCount: 1,
                              totalPrice: price,
                          },
                },
            };
        }

        case "CLEAR_CART": {
            return { items: {}, totalCount: 0, totalPrice: 0 };
        }
        case "REMOVE_PIZZA_BLOCK": {
            const type = action.payload.type;
            const size = action.payload.size;
            const id = action.payload.id;
            const blockPrice =
                state.items[id].items[`${size}${type}`].totalPrice;
            const blockCount =
                state.items[id].items[`${size}${type}`].totalCount;
            const newItems = {
                ...state.items[id].items,
            };

            delete newItems[`${size}${type}`];
            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: {
                        ...state.items[id],
                        items: newItems,
                        totalCount: state.items[id].totalCount - blockCount,
                        totalPrice: state.items[id].totalPrice - blockPrice,
                    },
                },
                totalCount: state.totalCount - blockCount,
                totalPrice: state.totalPrice - blockPrice,
            };
        }
        case "REMOVE_PIZZA": {
            const type = action.payload.type;
            const size = action.payload.size;
            const id = action.payload.id;
            return {
                ...state,
                totalCount: state.totalCount - 1,
                totalPrice: state.totalPrice - action.payload.price,
                items: {
                    ...state.items,
                    [id]: {
                        ...state.items[id],
                        items: {
                            ...state.items[id].items,
                            [`${size}${type}`]: {
                                ...state.items[id].items[`${size}${type}`],
                                totalCount:
                                    state.items[id].items[`${size}${type}`]
                                        .totalCount - 1,
                                totalPrice:
                                    state.items[id].items[`${size}${type}`]
                                        .totalPrice - action.payload.price,
                            },
                        },
                        totalCount: state.items[id].totalCount - 1,
                        totalPrice:
                            state.items[id].totalPrice - action.payload.price,
                    },
                },
            };
        }
        default:
            return state;
    }
};

export default cart;
