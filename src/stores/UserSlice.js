import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
    name:"User",
    initialState: {
        userName: localStorage.getItem("userName"),
        mail: localStorage.getItem("mail"),
        starRemaining: localStorage.getItem("starRemaining")
    },
    reducers: {
        user: state => {
            state.userName = localStorage.getItem("userName");
            state.mail = localStorage.getItem("mail");
            state.starRemaining = localStorage.getItem("starRemaining");
        },
        decrementStar: state => {
            state.userName = localStorage.getItem("userName");
            state.mail = localStorage.getItem("mail");
            state.starRemaining = localStorage.getItem("starRemaining") - 1 < 0 ? 0 : localStorage.getItem("starRemaining") - 1;
        }
    }
})

export const {user, decrementStar} = UserSlice.actions;

export default UserSlice.reducer;