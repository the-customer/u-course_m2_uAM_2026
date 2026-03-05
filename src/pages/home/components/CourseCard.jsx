import { Star, StarHalf, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({course}) {
    return (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="relative h-52 w-full overflow-hidden">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                        {course.price} €
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                        {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        { course.description }
                    </p>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <span className="flex items-center">
                            <User className="w-4 h-4 text-red-600 mr-1"/>
                            {course.students}
                        </span>
                        <span className="flex items-center">
                            <Star className="w-4 h-4 text-red-600 mr-1 border-r-red-600"/>
                            {course.rating}
                        </span>
                    </div>
                    <Link
                        to="..."
                        className="block w-full bg-black hover:bg-gray-800 text-white text-center py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                    >
                        Voir le Cours
                    </Link>
                </div>
            </div>
    )
}
