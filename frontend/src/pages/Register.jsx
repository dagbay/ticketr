import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import Loading from "../components/Loading";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          toast.success(`Registered new user - ${user.name}`);
          navigate("/");
        })
        .catch(toast.error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Ticketr - Register</title>
      </Helmet>
      <div className="mt-32">
        <div className="section mx-auto w-22">
          <div className="flex items-center justify-center h-full text-primary font-bold text-7xl gap-5">
            <FaUser />
            <h1>Register</h1>
          </div>
          <div className="text-center text-4xl mt-5">
            <p>Please create an account</p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col items-center mt-8">
            <div className="w-80">
              <div className="mb-4 w-full">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Name"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="mb-4 w-full">
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-outline btn-primary w-80">
              Register
            </button>
          </form>
          <div className="flex justify-center items-center my-5 gap-5">
            <Link to="/login" className="btn btn-ghost">
              Already Have an Account?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
