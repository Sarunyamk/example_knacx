import { configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import productsSlice from './productSlice'
import cartSlice from './cartSlice'

const store = configureStore({
    reducer: {
        userStore: userSlice,
        productStore: productsSlice,
        cartStore: cartSlice
    }

})

export default store