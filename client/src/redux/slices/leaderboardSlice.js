import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem('token')
const leaderboardSlice = createSlice({
    name:'leaderboard',
    initialState:{
        data:[],
    },
    reducers:{
        updateData(state,action){
            state.data = action.payload;
        }
    }
})

export const {updateData} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;


export const getLeaderboardData=()=>{
    return async(dispatch,getstate)=>{
      try {
        const response = await axios.get('http://localhost:5000/premium/showdleaderboard',{headers:{
            "Authorization":token,
            "Content-Type":"application/json"
        }})
        console.log(response.data.leaderboardOfUsers)
        dispatch(updateData(response.data.leaderboardOfUsers))
       
      } catch (error) {
        console.log(error)
        
      }
    }
}