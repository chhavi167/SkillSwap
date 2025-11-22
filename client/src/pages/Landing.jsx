export default function Landing() {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* left section */}
          <div>
            <h1 className="text-5xl font-bold text-primary leading-tight">
              Learn. Teach. Grow Together.
            </h1>
  
            <p className="mt-4 text-lg text-textDark">
              Connect with mentors, learn new skills, and help others grow — 
              all in one beautiful platform.
            </p>
  
            <a
              href="http://localhost:8000/auth/google"
              className="inline-block mt-6 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
            >
              Sign in with Google
            </a>
          </div>
  
          {/* right section image */}
          <div className="flex justify-center">
            <img
              src="/hero.png"
              alt="SkillSwap illustration"
              className="w-[420px] drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    );
  }
  