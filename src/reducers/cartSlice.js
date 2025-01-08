
import { createSlice } from "@reduxjs/toolkit";

// ค่าเริ่มต้นของตะกร้าสินค้า
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
                    items: [{ ...product, quantity: 1, totalPrice: product.price }],
                    totalQuantity: 1,
                    totalPrice: product.price,
                });
            } else {
                const userCart = state[userCartIndex];
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
            }

            console.log("Updated state:", JSON.stringify(state, null, 2)); // ตรวจสอบ State
            localStorage.setItem("cart", JSON.stringify(state));
        },


        removeCart: (state, action) => {
            const { userId, productId } = action.payload;
            const userCartIndex = state.findIndex((cart) => cart.userId === userId);

            if (userCartIndex !== -1) {
                const cart = state[userCartIndex];
                cart.items = cart.items.filter((item) => item.id !== productId);
                cart.totalQuantity = cart.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );
                cart.totalPrice = cart.items.reduce(
                    (sum, item) => sum + item.totalPrice,
                    0
                );

                // บันทึกลง LocalStorage
                localStorage.setItem("cart", JSON.stringify(state));
            }
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

                    // บันทึกลง LocalStorage
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

                    // บันทึกลง LocalStorage
                    localStorage.setItem("cart", JSON.stringify(state));
                }
            }
        },

        clearCart: (state, action) => {
            const { userId } = action.payload;
            const userCartIndex = state.findIndex((cart) => cart.userId === userId);

            if (userCartIndex !== -1) {
                state.splice(userCartIndex, 1);
                // บันทึกลง LocalStorage
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },
    },
});

export const {
    addToCart,
    removeCart,
    decrementQuantity,
    incrementQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
