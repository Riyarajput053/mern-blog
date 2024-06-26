import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setError("Fill out all the fields!");
    }
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        return setError(error.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-[#265073] via-[#2D9596] to-[#9AD0C2] rounded-lg text-white ">
              Tech
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">A Blog for technical information!</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="px-2 py-1 bg-gradient-to-r from-[#265073] via-[#2D9596] to-[#9AD0C2] rounded-lg text-white "
              type="submit"
            >
              {loading ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span className="pl-3">...loading</span>
                </>
              ) : (
                "Sign-up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account ? </span>
            <Link to="/sign-in" className="text-blue-500">
              Sign-In here
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
