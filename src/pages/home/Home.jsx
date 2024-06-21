import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  console.log({ isAuthenticated });

  const handleKeluar = () => {
    signOut();
    navigate("/");
  };

  console.log({ auth });

  return (
    <main className="w-full h-[100vh] flex justify-center items-center flex-col gap-2">
      <h1>Home</h1>
      <button className="p-2 rounded-md bg-red-500" onClick={handleKeluar}>
        Keluar
      </button>
      <button
        className="p-2 rounded-md bg-red-500"
        onClick={() => navigate("/profile")}
      >
        Profle
      </button>
    </main>
  );
}
