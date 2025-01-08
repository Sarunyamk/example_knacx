import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { userId, product } = action.payload;
            const userCartIndex = state.findIndex((cart) => cart.userId === userId);

            if (userCartIndex === -1) {
                state.push({
                    userId,
                    items: [
                        { ...product, quantity: 1, totalPrice: product.price }
                    ],
                    totalQuantity: 1,
                    totalPrice: product.price,
                });
            } else {
                const existingItem = state[userCartIndex].items.find(
                    (item) => item.id === product.id
                );

                if (existingItem) {
                    existingItem.quantity++;
                    existingItem.totalPrice += product.price;
                } else {
                    state[userCartIndex].items.push({
                        ...product,
                        quantity: 1,
                        totalPrice: product.price,
                    });
                }

                state[userCartIndex].totalQuantity++;
                state[userCartIndex].totalPrice += product.price;
            }

            localStorage.setItem("cart", JSON.stringify(state));
        },

        removeCart: (state, action) => {
            const { userId, productId } = action.payload;
            const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];

            // อัปเดตข้อมูลใน localStorage
            const updatedCart = cartFromStorage.map((cart) => {
                if (cart.userId === userId) {
                    cart.items = cart.items.filter((item) => item.id !== productId);
                    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
                }
                return cart;
            });

            // เขียนข้อมูลกลับไปยัง localStorage
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // อัปเดต Redux state (เพื่อให้ state สอดคล้องกับ localStorage)
            return updatedCart;
        },

        decrementQuantity: (state, action) => {
            const { userId, productId } = action.payload;
            const userCartIndex = state.findIndex((cart) => cart.userId === userId);

            if (userCartIndex !== -1) {
                const cart = state[userCartIndex];
                const existingItem = cart.items.find((item) => item.id === productId);

                if (existingItem) {
                    if (existingItem.quantity === 1) {
                        cart.items = cart.items.filter((item) => item.id !== productId);
                    } else {
                        existingItem.quantity--;
                        existingItem.totalPrice -= existingItem.price;
                    }

                    cart.totalQuantity--;
                    cart.totalPrice -= existingItem.price;

                    localStorage.setItem("cart", JSON.stringify(state));
                }
            }
        },

        incrementQuantity: (state, action) => {
            const { userId, productId } = action.payload;
            const userCartIndex = state.findIndex((cart) => cart.userId === userId);

            if (userCartIndex !== -1) {
                const cart = state[userCartIndex];
                const existingItem = cart.items.find((item) => item.id === productId);

                if (existingItem) {
                    existingItem.quantity++;
                    existingItem.totalPrice += existingItem.price;
                    cart.totalQuantity++;
                    cart.totalPrice += existingItem.price;

                    localStorage.setItem("cart", JSON.stringify(state));
                }
            }
        },

        initializeCart: () => {
            const cartData = JSON.parse(localStorage.getItem("cart")) || [];
            return cartData;
        },
    },
});

export const {
    addToCart,
    removeCart,
    decrementQuantity,
    incrementQuantity,
    initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
