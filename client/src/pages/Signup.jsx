import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

function Signup() {
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("please enter all fileds");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.errMessege);
      }
      setLoading(false);
      if (response.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-4 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1 ">
          <Link
            to={"/"}
            className="whitespace-nowrap text-sm sm:text-lg self-center"
          >
            <img
              className="p-2 bg-gradient-to-r h-20 text-white rounded-lg"
              src={
                theme === "dark"
                  ? `white-transparent.png`
                  : "black-transparent.png"
              }
              alt="logo"
            />
          </Link>
          <p className="mt-4 text-sm">
            your premier destination for the latest and most exciting tech news
            from around the world. Stay informed with up-to-the-minute updates,
            in-depth analyses, and insightful commentary on all things tech.
            Join us and stay ahead of the curve in the ever-evolving world of
            technology
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="m-10 flex flex-col gap-3">
            <div>
              <Label>username</Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={(e) => handleChange(e)}
              ></TextInput>
            </div>
            <div>
              <Label>Email</Label>
              <TextInput
                type="email"
                placeholder="email@company.com"
                id="email"
                onChange={(e) => handleChange(e)}
              ></TextInput>
            </div>
            <div>
              <Label>Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => handleChange(e)}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner className="mx-4" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign UP"
              )}
            </Button>
            {errorMessage && (
              <Alert className=" bg-red-400 text-white">{errorMessage}</Alert>
            )}
            <OAuth />
          </form>
          <span className="m-10 text-sm">
            Have an account?{"  "}
            <Link to={"/signin"} className="text-blue-500 ">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
