import axios from 'axios';
import { loginFailure, loginRequest, loginSuccess } from '../Slice/slice';
import { getEmployeeFailure , getEmployeeRequest , getEmployeeSuccess } from '../Slice/getEmployee';

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/admin/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            // Uncomment if using token-based authentication
            // 'Authorization': 'Bearer your_token_here'
          }
        }
      );
      console.log(response)
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.response ? error.response.data : 'Network error'));
      console.log(error.stack);
    }
  };
};


export const getEmployee = (token)=>{
 
  return async(dispatch)=>{
    dispatch(getEmployeeRequest())
    try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/employee/list' , {
          headers:{
            'Authorization':`Bearer ${token}`
          }
        })
        console.log(response)
        dispatch(getEmployeeSuccess(response.data))
    } catch (error) {
      dispatch(getEmployeeFailure(error.response ? error.response.data : 'Network Error'))
      console.log(error.stack)
    }
  }
}
