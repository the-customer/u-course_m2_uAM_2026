import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <img
              src="https://public.readdy.ai/ai/img_res/d9c21515-4f31-435b-a874-b135e48e1b22.png"
              alt="Logo"
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Plateforme d'apprentissage en ligne offrant des cours de qualité pour développer vos compétences professionnelles.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                  Cours
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                  Profil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Catégories</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Développement Web</li>
              <li className="text-gray-400 text-sm">Intelligence Artificielle</li>
              <li className="text-gray-400 text-sm">Design UX/UI</li>
              <li className="text-gray-400 text-sm">Cybersécurité</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-500">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex items-center">
                <i className="ri-mail-line mr-2"></i>
                contact@plateforme.com
              </li>
              <li className="text-gray-400 text-sm flex items-center">
                <i className="ri-phone-line mr-2"></i>
                +33 1 23 45 67 89
              </li>
              <li className="flex space-x-4 mt-4">
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 hover:bg-red-600 rounded-full transition-colors cursor-pointer">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 hover:bg-red-600 rounded-full transition-colors cursor-pointer">
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="#" className="w-9 h-9 flex items-center justify-center bg-gray-700 hover:bg-red-600 rounded-full transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Plateforme d'Apprentissage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}