import {configureStore} from '@reduxjs/toolkit';

import portfolioSlice from '../features/portfolioSlice';

export const store = configureStore({
    reducer:{
        allCart: portfolioSlice
    }
})