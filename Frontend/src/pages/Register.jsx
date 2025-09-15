import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { asyncUserRegister } from "../redux/actions/UserActions";
import { useDispatch } from "react-redux";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const dispatch=useDispatch()

  // form submit handler
  const onSubmit = (user) => {
    const payload = {
      fullname: {
        firstname: user.firstname,
        lastname: user.lastname,
      },
      email: user.email,
      password: user.password,
    };

      dispatch(asyncUserRegister(payload))
    console.log(payload);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-96 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            type="text"
            placeholder="First Name"
            {...register("firstname", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}

          <input
            type="text"
            placeholder="LastName"
            {...register("lastname", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md text-white font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login redirect */}
        <p className="text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
