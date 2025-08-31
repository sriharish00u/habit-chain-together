import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="animate-bounce-in mb-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto flex items-center justify-center shadow-strong">
            <span className="text-2xl">🔗</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gradient-primary">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Looks like this habit chain is broken. Let's get you back on track!
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center gap-2 h-12 px-6 py-3 bg-gradient-primary text-white font-medium rounded-lg shadow-soft hover:shadow-medium hover:translate-y-[-1px] transition-all"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
