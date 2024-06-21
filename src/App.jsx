import "./App.css";
import { useNavigate } from "react-router-dom";
import useHandleChange from "./hooks/useHandleChange";
import Alert from "./components/ui/alert";
import useHandleAlert from "./hooks/useHandleAlert";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const signIn = useSignIn();

  const { data: alert, status, handleAlert } = useHandleAlert();

  const { value, handleChange, clearValue } = useHandleChange({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const resJson = await res.json();

    if (!resJson.status) {
      setIsLoading(false);
      return handleAlert("error", resJson.message);
    }

    const { token, data: user } = resJson;

    if (
      signIn({
        auth: {
          token: token,
          type: "Bearer",
        },
        refresh: resJson.refreshToken,
        userState: { name: user.name, uid: user.id },
      })
    ) {
      handleAlert("success", "Login berhasil");
      clearValue();
      setIsLoading(false);
      navigate("/home");
    } else {
      setIsLoading(false);
      return handleAlert("error", "Login gagal");
    }
  };

  return (
    <main className="w-full h-[100vh] flex flex-col gap-4 justify-center items-center">
      <Alert status={status} data={{ alert }} />

      <div className="">
        <h1 className="text-[2rem] font-semibold uppercase tracking-[1px]">
          Login page
        </h1>
      </div>
      <form className="w-[90%] lg:w-[35%] h-max " onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={value.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={value.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed "
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex items-start mb-5 gap-2">
        <p>Belum punya akun?</p>
        <button
          className="text-violet-500"
          onClick={() => navigate("/auth/register")}
        >
          Daftar
        </button>
      </div>
    </main>
  );
}

export default App;
