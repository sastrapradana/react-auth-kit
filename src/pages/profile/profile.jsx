import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

export default function Profle() {
  const auth = useAuthUser();
  const navigate = useNavigate();

  console.log({ auth });

  return (
    <main className="w-full h-[100vh] flex justify-center items-center flex-col gap-2">
      <h1 className="text-white">Name: {auth.name}</h1>
      <button
        className="p-2 rounded-md bg-red-500"
        onClick={() => navigate("/home")}
      >
        Home
      </button>
    </main>
  );
}
