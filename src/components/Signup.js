import React, {useState, useContext} from 'react'
import { AlertContext } from '../context/AlertContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { TextField, Button, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton, FormHelperText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email: "", mobile:"", password: ""}) 
    const [showPassword, setShowPassword] = useState(false)
    
    let navigate = useNavigate();
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const {alert, showAlert} = useContext(AlertContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
       const {name, email, password, mobile} = credentials;
        if(mobile.length > 10 || mobile.length < 10)
        {
            showAlert(" please enter a valid mobile number !", "danger")
        }
       else if(!regularExpression.test(password))
       {
        showAlert("password should be alphanumerical and contain atleast one special character!", "danger");
       }
       else
       {
        showAlert("Please Wait for a while", "warning");
        const response = await fetch("https://localhost:7228/api/Auth/Register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_Name: name,email: email,mobile:mobile, password: password})
        });
        const json = await response.text()
        
        
        if (response.status == 200){
            // Save the auth token and redirect
            // localStorage.setItem('token', json.authtoken); 
            navigate("/auth/login");
            showAlert("Account Created Successfully", "success");

        }   
        else{
            showAlert(json, "danger");
        }
      }
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <Alert alert={alert}/>
       
        <div className="d-flex mt-3">
            <div className="col-md-7 ps-5 pe-5 pt-2 viewsignup " style={{ width: "50%" }}>
            <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/auth/login" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Login here</Button>
            <h2 style={{ fontWeight: "Bold", fontSize: "30px" }}>Create an account to use ContactBook</h2>
            <p className="mb-4">Use your email to create a new account</p>
            <form autoComplete='off' onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                    <TextField color="secondary" type="text" name='name' className="form-control" id="name" required aria-describedby="emailHelp" onChange={onChange} label="Your Name" variant="outlined" fullWidth  />
                </div>
                <div className="form-group mb-4">
                    <TextField type="email" name='email' className="form-control" id="email" required onChange={onChange} aria-describedby="emailHelp" color="secondary" label="Email"  fullWidth />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-4">
                    <TextField color="secondary" type="number" minLength="10" name='mobile' className="form-control" id="name" required aria-describedby="emailHelp" onChange={onChange} label="Your Mobile Number" variant="outlined" fullWidth  />
                </div>
                <div className="form-group mb-2">
                <FormControl variant="outlined" fullWidth>
                            <InputLabel color="secondary" required  htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className="form-control" onChange={onChange} name="password" minLength={5} required
                                id="outlined-adornment-password"
                                color="secondary"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"  />
                                <FormHelperText  id="outlined-weight-helper-text"></FormHelperText>
                        </FormControl>
                </div>
                <br></br>
                <Button type="submit" fullWidth size="large" className="mb-4" variant="contained" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>SignUp</Button>
            </form>

            </div>
        </div>
        </>
    )
}

export default Signup
