import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: [],
    showloader: true,
    userBio: [],
}
const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            console.log('state set: ',state.user.bio);
        },
        setshowloader: (state, action) => {
            state.showloader = action.payload;
            console.log('ye scene hai: ',action.payload);
        },
        setUserBio: (state, action) => {
            state.userBio = action.payload;
            console.log('state set: ',state.userBio);
        },
    }
})

export const {setUser,setshowloader,setUserBio} = portfolioSlice.actions
export default portfolioSlice.reducer