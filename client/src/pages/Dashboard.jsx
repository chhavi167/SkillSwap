export default function Dashboard() {
    const token = localStorage.getItem("token");
  
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center bg-background">
        <h1 className="text-3xl font-bold text-primary">
          Welcome to SkillSwap Dashboard 🎉
        </h1>
  
        <p className="mt-4 text-textDark">
          You are logged in with JWT token:
        </p>
  
        <code className="mt-2 p-3 bg-surface shadow text-sm rounded max-w-xl break-all">
          {token}
        </code>
      </div>
    );
  }
  