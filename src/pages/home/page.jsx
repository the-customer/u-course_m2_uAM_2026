import { Link } from "react-router-dom";
import Spinner from "../../components/features/Spinner";
import CourseCard from "./components/CourseCard";
import { useEffect, useState } from "react";
import { api } from "../../api/mockApi";

export default function HomePage() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);


    const loadCourses = async () => {
        try {
            const data = await api.getCourses();
            setCourses(data.slice(0,3));
        } catch (error) {
            console.log('Erreur lors du chargement des cours : ', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex flex-col">
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://readdy.ai/api/search-image?query=modern%20online%20learning%20education%20concept%20with%20students%20using%20laptops%20and%20tablets%20in%20bright%20contemporary%20space%2C%20digital%20technology%20and%20books%2C%20inspiring%20educational%20environment%20with%20natural%20light%2C%20minimalist%20clean%20aesthetic%20with%20red%20and%20black%20accents&width=1920&height=1080&seq=hero1&orientation=landscape)'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto w-full">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Apprenez Sans Limites
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Développez vos compétences avec des cours en ligne de qualité professionnelle. Obtenez des certifications reconnues et propulsez votre carrière.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="..."
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer inline-block"
                        >
                            Explorer les Cours
                        </Link>
                        <Link
                            to="..."
                            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all border-2 border-white/30 whitespace-nowrap cursor-pointer inline-block"
                        >
                            Mon Profil
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Pourquoi Nous Choisir ?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Une plateforme complète pour votre réussite professionnelle
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
                                <i className="ri-book-open-line text-3xl text-red-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cours de Qualité</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Des contenus créés par des experts reconnus dans leur domaine. Apprenez avec les meilleurs pour devenir le meilleur.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
                                <i className="ri-award-line text-3xl text-red-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Obtenez des certifications reconnues qui valorisent vos compétences et boostent votre CV auprès des recruteurs.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
                                <i className="ri-time-line text-3xl text-red-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexibilité</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Apprenez à votre rythme, où vous voulez et quand vous voulez. Accédez à vos cours 24h/24 depuis n'importe quel appareil.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Cours Populaires
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez nos formations les plus appréciées par les étudiants
                        </p>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            { courses.map(course => <CourseCard course={course} key={course.id} />) }
                        </div>
                    )}

                    <div className="text-center">
                        <Link
                            to="..."
                            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                        >
                            Voir Tous les Cours
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gradient-to-br from-red-600 to-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Prêt à Commencer Votre Apprentissage ?
                    </h2>
                    <p className="text-xl mb-10 text-gray-100 leading-relaxed">
                        Rejoignez des milliers d'étudiants qui ont déjà transformé leur carrière grâce à nos formations professionnelles.
                    </p>
                    <Link
                        to="/courses"
                        className="inline-block bg-white text-red-600 hover:bg-gray-100 px-10 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                    >
                        Commencer Maintenant
                    </Link>
                </div>
            </section>
        </div>
    )
}
