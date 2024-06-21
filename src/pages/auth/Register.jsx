import { useNavigate } from "react-router-dom";
import useHandleChange from "../../hooks/useHandleChange";
import Alert from "../../components/ui/alert";
import useHandleAlert from "../../hooks/useHandleAlert";
import { useState } from "react";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { data: alert, status, handleAlert } = useHandleAlert();
  const { value, handleChange, clearValue } = useHandleChange({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    if (!res.status) {
      setIsLoading(false);
      return handleAlert("error", res.message);
    }
    handleAlert("success", "Register berhasil");
    clearValue();
    setIsLoading(false);
  };

  return (
    <main className="w-full h-[100vh] flex flex-col gap-4 justify-center items-center">
      <Alert status={status} data={{ alert }} />
      <div className="">
        <h1 className="text-[2rem] font-semibold uppercase tracking-[1px]">
          register page
        </h1>
      </div>
      <form className="w-[90%] lg:w-[35%] h-max " onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={value.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="nama lengkap"
            required=""
          />
        </div>
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
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed "
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      <div className="flex items-start mb-5 gap-2">
        <p>Sudah punya akun?</p>
        <button className="text-violet-500" onClick={() => navigate("/")}>
          Masuk
        </button>
      </div>
    </main>
  );
}
