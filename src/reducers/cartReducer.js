// import { createSlice } from "@reduxjs/toolkit";
// import products from "../data/data";
//
// export const cartSlice = createSlice({
//     name: 'shop',
//     initialState: {
//         items: products,
//     },
//
//     reducers: {
//         addToCart: (state, action) => {
//             state.items = state.items.map((i) => {
//                 if (i.id === action.payload) {
//                     i.inCart = true;
//                     i.quantity += i.count;
//                 }
//                 return i;
//             });
//         },
//     }
// })
//
// export const {
//     addToCart
// } = cartSlice.actions;
//
// export default cartSlice.reducer;
