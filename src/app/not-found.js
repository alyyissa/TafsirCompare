import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mt-15 flex flex-col items-center justify-center min-h-screen bg-white px-6 py-20 text-slate-900">
            <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-coprimary)] bg-clip-text text-transparent select-none tracking-tighter">
                404
            </h1>
            
            <div className="h-1 w-24 md:w-32 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-coprimary)] my-8 opacity-20"></div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">
                Page Not Found
            </h2>
            
            <p className="md:text-xl text-slate-500 max-w-lg text-center leading-relaxed font-light">
                The content you are looking for has been moved, renamed, or is currently under research.
            </p>
            
            <Link 
                href="/" 
                className="group flex items-center gap-3 bg-[var(--color-primary)] hover:bg-[var(--color-hover)] px-10 py-4 text-white rounded-full mt-12 font-bold active:scale-95 transition-all shadow-xl shadow-emerald-900/10"
            >
                Back to Home
                <svg 
                    className="group-hover:translate-x-1 transition-transform" 
                    width="22" 
                    height="22" 
                    viewBox="0 0 22 22" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>
        </div>
    );
};