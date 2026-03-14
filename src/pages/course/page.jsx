import { useEffect, useState } from "react";
import CourseCard from "./components/courseCard";
import { api } from "../../api/mockApi";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await api.getCourses();
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.error('Erreur lors du chargement des donnees :', error);
    } finally {
      setLoading(false);
    }
  }

  const filterCourses = (keyword) => {
    if (keyword === 'beginner') keyword = 'débutant';
    if (keyword === 'intermediate') keyword = 'intermédiaire';
    if (keyword === 'advanced') keyword = 'avancé';
    // if (keyword === 'all'){
    //   return setCourses(courses);
    // }

    setCourses(courses.filter(course => course.level.toLowerCase().includes(keyword)));
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Catalogue de Cours
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez notre collection complète de formations professionnelles et développez vos compétences
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un cours..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => {setFilter('all');filterCourses('all')}}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer text-sm ${
                    filter === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  Tous
                </button>
                <button 
                  onClick={() => {setFilter('beginner');filterCourses('beginner')}}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer text-sm ${
                    filter === 'beginner'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  Débutant
                </button>
                <button 
                  onClick={() => {setFilter('intermediate');;filterCourses('intermediate')}}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer text-sm ${
                    filter === 'intermediate'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  Intermédiaire
                </button>
                <button 
                  onClick={() => setFilter('advanced')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer text-sm ${
                    filter === 'advanced'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  Avancé
                </button>
              </div>
            </div>
          </div>

          {loading ?
            (<div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
            </div>)
            :
            (<>
              <div className="mb-6 text-gray-600">
                <strong>{courses.length}</strong> cours trouvé{courses.length > 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => <CourseCard />)}
              </div>
            </>)

          }


        </div>
      </div>
    </div>
  )
}
