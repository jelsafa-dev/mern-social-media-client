import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { Title } from "./../components/Title";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const Register = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 w-full h-full">
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm m-auto">
        <div className="w-100 text-center">
          <Title />
        </div>
        <div className="p-8 mx-auto">
          <div className="flex flex-col mb-4 text-center">
            <h5 className="font-bold text-gray-900 dark:text-white text-[24px]">
              Create a new account
            </h5>
            <p className="text-gray-900 dark:text-white text-[14px]">
              <span>Or </span>
              <span
                className="text-blue-500 font-medium hover:text-blue-400 cursor-pointer"
                onClick={() => navigate("/")}
              >
                sign in to your account
              </span>
            </p>
          </div>
          <Formik
            onSubmit={register}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 dark:text-white text-[14px]">
                        First Name
                      </span>
                      <input
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {Boolean(touched.firstName) &&
                        Boolean(errors.firstName) && (
                          <span className="text-red-600 text-[12px]">
                            {errors.firstName}
                          </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 dark:text-white text-[14px]">
                        Last Name
                      </span>
                      <input
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {Boolean(touched.lastName) &&
                        Boolean(errors.lastName) && (
                          <span className="text-red-600 text-[12px]">
                            {errors.lastName}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 dark:text-white text-[14px]">
                        Location
                      </span>
                      <input
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {Boolean(touched.location) &&
                        Boolean(errors.location) && (
                          <span className="text-red-600 text-[12px]">
                            {errors.location}
                          </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-700 dark:text-white text-[14px]">
                        Occupation
                      </span>
                      <input
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {Boolean(touched.occupation) &&
                        Boolean(errors.occupation) && (
                          <span className="text-red-600 text-[12px]">
                            {errors.occupation}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="flex gap-4">
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
                      {Boolean(touched.password) &&
                        Boolean(errors.password) && (
                          <span className="text-red-600 text-[12px]">
                            {errors.password}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="border-2 border-dashed rounded p-4">
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="flex cursor-pointer w-100 gap-4 justify-between">
                          <div
                            {...getRootProps()}
                            className="text-gray-500 hover:text-gray-400"
                          >
                            {!values.picture ? (
                              <p>Add Image Here...</p>
                            ) : (
                              <div className="flex items-center gap-4">
                                <EditOutlined />
                                <p className="truncate hover:text-clip max-w-xs">
                                  {values.picture.name}
                                </p>
                              </div>
                            )}
                          </div>
                          {values.picture && (
                            <button
                              className="text-gray-500 hover:text-gray-400"
                              onClick={() => setFieldValue("picture", null)}
                            >
                              <DeleteOutlined />
                            </button>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  <div className="flex flex-col">
                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 rounded-md shadow-lg text-white p-3"
                    >
                      REGISTER
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

export default Register;
