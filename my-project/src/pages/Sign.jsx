import { Button, TextField } from "@mui/material"
import img5 from "../assets/5.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { API, saveToken } from "../../url/url";

function Sign() {
  const [form, setForm] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/Account/register`,
        form
      );

      if (data.statusCode === 200) {
        toast.success('Success! Redirecting to Login...');
        navigate('/login', { state: { userName: form.userName, password: form.password } });
      } else if(data.statusCode === 400) {
        toast.error("Wrong data. Please check fields and passwords.");
      } else if(data.statusCode === 500){
        toast.error("Server error. Please try later");
      } else {
        toast.error("Registration failed: " + data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.errors || "Registration failed";
      toast.error("Error: " + JSON.stringify(errorMessage));
    }
  };

  return (
    <div className="flex items-end justify-center p-5 lg:p-30">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <p className="text-4xl font-semibold">Create an account</p>
        <br />
        <p>Enter your details below</p>
        <br /><br />

        <div className="flex flex-col items-center gap-4 w-50 lg:w-100">
          <TextField fullWidth label="Username" name="userName" value={form.userName} onChange={handleChange} />
          <TextField fullWidth label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
          <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-3 items-center w-100 mt-7">
          <Button type="submit" style={{ padding: "10px" }} fullWidth color="warning" variant="contained">
            REGISTER
          </Button>
          <img className="cursor-pointer" src={img5} alt="" />
        </div>

        <div className="flex items-center gap-5 justify-between mt-5">
          <p className="font-semibold text-gray-500">Already have account?</p>
          <Link to="/login">
            <p className="text-gray-700 underline cursor-pointer">Log in</p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Sign