import { Link } from "react-router-dom";

export default function LeftSide() {
    return (
        <div
            className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 text-white"
            style={{
                backgroundImage:
                    'url(https://readdy.ai/api/search-image?query=modern%20online%20education%20platform%20concept%20with%20glowing%20digital%20screens%20showing%20courses%20and%20certificates%2C%20dark%20atmospheric%20background%20with%20red%20accent%20lights%2C%20abstract%20technology%20learning%20environment%2C%20cinematic%20professional%20photography%20with%20depth%20of%20field&width=900&height=1080&seq=loginbg&orientation=portrait)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-red-900/50"></div>
            <div className="relative z-10">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="https://public.readdy.ai/ai/img_res/d9c21515-4f31-435b-a874-b135e48e1b22.png"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </Link>
            </div>
            <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-4 leading-tight">
                    Apprenez, Enseignez,<br />
                    <span className="text-red-400">Évoluez.</span>
                </h2>
                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                    Rejoignez notre communauté de milliers d'étudiants et de professeurs passionnés.
                </p>
                <div className="space-y-4">
                    {[
                        { icon: 'ri-book-open-line', text: 'Accédez à des cours de qualité professionnelle' },
                        { icon: 'ri-award-line', text: 'Obtenez des certifications reconnues' },
                        { icon: 'ri-group-line', text: 'Partagez votre expertise en tant que professeur' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-9 h-9 flex items-center justify-center bg-red-600/30 rounded-full flex-shrink-0">
                                <i className={`${item.icon} text-red-400`}></i>
                            </div>
                            <span className="text-gray-200 text-sm">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative z-10 text-gray-500 text-xs">
                © 2025 LearnPro. Tous droits réservés.
            </div>
        </div>
    )
}
