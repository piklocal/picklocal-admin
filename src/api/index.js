import { configureStore } from '@reduxjs/toolkit';
import vendorReducer from './vendors';
import adminReducer from './auth'
import productReducer from './globalProducts'
import subadminReducer from './subAdmin'
export default configureStore({
  reducer: {
   
        auth:adminReducer,
        vendors:vendorReducer,
        products:productReducer,
        subadmins:subadminReducer

  },
});
