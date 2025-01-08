import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const saveToLocalStorage = (state) => {
    localStorage.setItem("cart", JSON.stringify(state));
};

const findUserCart = (state, userId) => {
    return state.find((cart) => cart.userId === userId);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { userId, product } = action.payload;

            let userCart = findUserCart(state, userId);
            if (!userCart) {
                userCart = { userId, items: [], totalQuantity: 0, totalPrice: 0 };
                state.push(userCart);
            }

            const existingItem = userCart.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += product.price;
            } else {
                userCart.items.push({
                    ...product,
                    quantity: 1,
                    totalPrice: product.price,
                });
            }

            userCart.totalQuantity++;
            userCart.totalPrice += product.price;

            saveToLocalStorage(state);
        },
        removeCart: (state, action) => {
            const productId = action.payload;

            state.forEach((cart) => {
                cart.items = cart.items.filter((item) => item.id !== productId);
                cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                cart.totalPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
            });

            saveToLocalStorage(state);
        },
        decrementQuantity: (state, action) => {
            const { userId, productId } = action.payload;

            const userCart = findUserCart(state, userId);
            if (userCart) {
                const existingItem = userCart.items.find((item) => item.id === productId);

                if (existingItem) {
                    if (existingItem.quantity === 1) {
                        userCart.items = userCart.items.filter((item) => item.id !== productId);
                    } else {
                        existingItem.quantity--;
                        existingItem.totalPrice -= existingItem.price;
                    }

                    userCart.totalQuantity--;
                    userCart.totalPrice -= existingItem.price;

                    saveToLocalStorage(state);
                }
            }
        },
        incrementQuantity: (state, action) => {
            const { userId, productId } = action.payload;

            const userCart = findUserCart(state, userId);
            if (userCart) {
                const existingItem = userCart.items.find((item) => item.id === productId);

                if (existingItem) {
                    existingItem.quantity++;
                    existingItem.totalPrice += existingItem.price;

                    userCart.totalQuantity++;
                    userCart.totalPrice += existingItem.price;

                    saveToLocalStorage(state);
                }
            }
        },
    },
});

export const { addToCart, removeCart, decrementQuantity, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
