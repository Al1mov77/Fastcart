import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { saveToken } from "../../url/url";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: "", password: "" });

  useEffect(() => {
    if (location.state) {
      setForm({
        userName: location.state.userName || "",
        password: location.state.password || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/Account/login`,
        form
      );

      if (data.statusCode === 200) {
        toast.success("Login successful!");
        saveToken(data.data);
        navigate("/");
      } else {
        toast.error("Login failed: " + data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.errors || "Login failed";
      toast.error("Error: " + JSON.stringify(errorMessage));
    }
  };

  return (
    <div className="flex justify-center items-center p-5 ">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleLogin}>
        <TextField label="Username" name="userName" value={form.userName} onChange={handleChange} />
        <TextField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">LOGIN</Button>
      </form>
    </div>
  );
}

export default Login;