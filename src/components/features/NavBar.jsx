
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout, isStudent, isInstructor } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen,setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/home');
  }

  return (
    <nav className="bg-black text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://public.readdy.ai/ai/img_res/d9c21515-4f31-435b-a874-b135e48e1b22.png"
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-base hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
              Accueil
            </Link>
            <Link to="/courses" className="text-base hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
              Cours
            </Link>


            {currentUser ? (<>
              {isStudent && (<Link to="/profile" className="text-base hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
                Mon Espace
              </Link>)}

              {isInstructor && (<Link to="/instructor-profile" className="text-base hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
                Espace Professeur
              </Link>)}


              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <div className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-semibold max-w-[120px] truncate">{currentUser.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap ${isInstructor ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-200'
                    }`}>
                    {isInstructor ? 'Prof' : 'Étudiant'}
                  </span>
                  
                  
                  { dropdownOpen ? <ChevronUp/> : <ChevronDown/>}
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => { setDropdownOpen(false)}}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm font-bold text-gray-900 truncate">{'aly tall'}</p>
                        <p className="text-xs text-gray-500 truncate">{'email'}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-user-line text-base"></i>
                          Mon Profil
                        </Link>
                        <Link
                          to="/instructor-profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-shield-star-line text-base"></i>
                          Espace Professeur
                        </Link>
                        <Link
                          to="/courses"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-book-open-line text-base"></i>
                          Catalogue des cours
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={ handleLogout }
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <i className="ri-logout-box-line text-base"></i>
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>) : <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer font-semibold flex items-center gap-2"
            >
              <i className="ri-login-box-line"></i>
              Se connecter
            </Link>}



          </div>

        </div>
      </div>

    </nav>
  );
}

