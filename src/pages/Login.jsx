import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import { Title } from "./../components/Title";

const loginSchema = yup.object().shape({
  email: yup.string().email("*invalid").required("*required"),
  password: yup.string().required("*required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      localStorage.setItem("token", loggedIn.token);

      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 w-full h-full">
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 m-auto shadow-sm">
        <div className="w-100 text-center">
          <Title />
        </div>
        <div className="p-8 mx-auto">
          <div className="flex flex-col mb-4 text-center">
            <h5 className="font-bold text-gray-900 dark:text-white text-[24px]">
              Sign in to your account
            </h5>
            <p className="text-gray-900 dark:text-white text-[14px]">
              <span>Or </span>
              <span
                className="text-blue-500 font-medium hover:text-blue-400 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                create a new account
              </span>
            </p>
          </div>
          <Formik
            onSubmit={handleLogin}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-700 dark:text-white text-[14px]">
                      Email
                    </span>
                    <input
                      type="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      placeholder="john@example.com"
                      className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {Boolean(touched.email) && Boolean(errors.email) && (
                      <span className="text-red-600 text-[12px]">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-700 dark:text-white text-[14px]">
                      Password
                    </span>
                    <input
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {Boolean(touched.password) && Boolean(errors.password) && (
                      <span className="text-red-600 text-[12px]">
                        {errors.password}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 rounded-md shadow-lg text-white p-3"
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
