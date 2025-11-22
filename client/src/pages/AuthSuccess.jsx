import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("token")) {
      const token = new URLSearchParams(hash.replace("#", "?")).get("token");
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-xl font-semibold">
      Logging you in...
    </div>
  );
}
