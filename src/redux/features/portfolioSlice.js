import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: []
}
const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            console.log('state set: ',state.user.bio);
        }
    }
})

export const {setUser} = portfolioSlice.actions
export default portfolioSlice.reducer