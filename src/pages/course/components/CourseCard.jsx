export default function CourseCard() {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="relative h-52 w-full overflow-hidden">
                <img
                    src="https://readdy.ai/api/search-image?query=professional%20web%20development%20coding%20workspace%20with%20modern%20laptop%20displaying%20colorful%20code%20editor%2C%20HTML%20CSS%20JavaScript%20on%20screen%2C%20clean%20minimalist%20desk%20setup%20with%20coffee%20and%20notebook%2C%20bright%20natural%20lighting%2C%20tech%20startup%20atmosphere%20with%20red%20and%20black%20color%20accents&width=800&height=600&seq=course1&orientation=landscape"
                    alt="Développement Web Complet"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    299 €
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Intermédiaire
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-gray-600">
                    <i className="ri-user-line mr-1"></i>
                    <span className="mr-4">Sophie Martin</span>
                    <i className="ri-time-line mr-1"></i>
                    <span>12 heures</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    Développement Web Complet
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    Maîtrisez HTML, CSS, JavaScript et React pour créer des applications web modernes et performantes.
                </p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <span className="flex items-center">
                        <i className="ri-group-line mr-1"></i>
                        1,234 étudiants
                    </span>
                    <span className="flex items-center">
                        <i className="ri-star-fill text-yellow-500 mr-1"></i>
                        4.8
                    </span>
                </div>
                <a
                    href="/course/1"
                    className="block w-full bg-black hover:bg-gray-800 text-white text-center py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                    Voir les Détails
                </a>
            </div>
        </div>
    )
}
