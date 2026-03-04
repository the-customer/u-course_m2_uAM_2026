import { Link, useNavigate } from "react-router-dom";
import LeftSide from "./components/LeftSide";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";



export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const DEMO_ACCOUNTS = [
        {
            role: 'Étudiant',
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            icon: 'ri-user-line',
            color: 'bg-gray-900',
        },
        {
            role: 'Professeur',
            name: 'Sophie Martin',
            email: 'sophie.martin@email.com',
            icon: 'ri-shield-star-line',
            color: 'bg-red-600',
        },
        {
            role: 'Professeur',
            name: 'Dr. Ahmed Benali',
            email: 'ahmed.benali@email.com',
            icon: 'ri-shield-star-line',
            color: 'bg-red-600',
        },
    ];

    async function handleSubmit(e) { 
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(email,password);
            if(user.role === 'instructor'){
                navigate('/instructor-profile')
            }else{
                navigate('/profile')
            }
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false);
        }
    }

    function fillDemo(email) {
        setEmail(email);
        setPassword('password123');
    }



    return (
        <div className="min-h-screen flex">
            {/* Left panel */}
            <LeftSide />

            {/* Right panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link to="/">
                            <img
                                src="https://public.readdy.ai/ai/img_res/d9c21515-4f31-435b-a874-b135e48e1b22.png"
                                alt="Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
                        <p className="text-gray-500 text-sm">
                            Connectez-vous pour accéder à votre espace personnel.
                        </p>
                    </div>

                    {/* Demo accounts */}
                    <div className="mb-6">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Comptes de démonstration
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            {DEMO_ACCOUNTS.map((acc, i) => (
                                <button
                                    key={i}
                                    onClick={() => fillDemo(acc.email)}
                                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all cursor-pointer text-left group"
                                >
                                    <div className={`w-8 h-8 flex items-center justify-center ${acc.color} rounded-full flex-shrink-0`}>
                                        <i className={`${acc.icon} text-white text-sm`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-800 truncate">{acc.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{acc.email}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${acc.role === 'Professeur' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {acc.role}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Mot de passe pour tous : <span className="font-mono font-bold text-gray-600">password123</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400">ou saisissez manuellement</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                <i className="ri-error-warning-line flex-shrink-0"></i>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Adresse email
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                                    <i className="ri-mail-line text-base"></i>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                                    <i className="ri-lock-line text-base"></i>
                                </div>
                                <input
                                    type={ showPassword ? 'text' : 'password' }
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-red-200 cursor-pointer'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <i className="ri-loader-4-line animate-spin"></i>
                                    Connexion en cours...
                                </>
                            ) : (
                                <>
                                    <i className="ri-login-box-line"></i>
                                    Se connecter
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                            <i className="ri-arrow-left-line"></i>
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
