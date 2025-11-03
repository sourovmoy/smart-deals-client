import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    createUserWithEmailAndPasswordFunc,
    sendEmailVerificationFunc,
    updateProfileFunc,
    setError,
    setLoader,
    setUser,
    user,
    error,
  } = useContext(AuthContext);

  const handelLogin = (e) => {
    setUser(null);
    setError("");
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    const name = e.target.name.value;

    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        updateProfileFunc({ displayName: name, photoURL: photo })
          .then(() => {
            sendEmailVerificationFunc()
              .then(() => {
                toast.success("Verify your email first");

                const newUser = {
                  name: res.user.displayName,
                  email: res.user.email,
                  photoURL: res.user.photoURL,
                };
                fetch("http://localhost:3000/users", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newUser),
                })
                  .then((res) => res.json())
                  .then();
                setUser(res.user);
                setLoader(false);
                e.target.reset();
                navigate("/");
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
        setLoader(false);
      });
  };
  return (
    <div className="flex justify-center items-center mt-5 sm:mt-12">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-center text-4xl font-semibold mt-5">
          Register Now!
        </h1>
        <Link to={"/auth/login"} className="text-center mt-4 text-base-200">
          Already have an account?{" "}
          <span className="text-primary">Login Now</span>
        </Link>
        <div className="card-body">
          <form onSubmit={handelLogin}>
            <fieldset className="fieldset">
              <label className="label text-base-300 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                autoComplete="username"
              />
              <label className="label text-base-300 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                autoComplete="username"
              />
              <label className="label text-base-300 font-medium">
                Image-URL
              </label>
              <input
                type="text"
                name="photo"
                className="input"
                placeholder="Image-URL"
                autoComplete="username"
              />
              <label className="label text-base-300 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                autoComplete="current-password"
              />

              <button className="btn border-none text-white bg-linear-to-l from-[#9F62F2] to-[#632EE3] mt-4">
                Login
              </button>
            </fieldset>
          </form>
          {user && <p className="text-green-500">Successfully Register.</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
