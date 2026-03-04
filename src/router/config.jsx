import MainLayout from "../layouts/MainLayout";
import CertificationPage from "../pages/certification/page";
import CourseDetailPage from "../pages/course-detail/page";
import CoursePage from "../pages/course/page";
import EnrollmentPage from "../pages/enrollment/page";
import HomePage from "../pages/home/page";
import InstructorProfilePage from "../pages/instuctor-profile/page";
import LoginPage from "../pages/login/page";

import NotFound from "../pages/notFound";
import ProfilePage from "../pages/profile/page";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/home",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/courses",
                element: <CoursePage />
            },
            {
                path: "/course/:id",
                element: <CourseDetailPage />
            },
            {
                path: "/enrollment/:id",
                element: <EnrollmentPage />
            },
            {
                path: "/certification/:id",
                element: <CertificationPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/instructor-profile",
                element: <InstructorProfilePage />
            }
        ]
    },
    { path:"*", element: <NotFound/>}

];

export default routes;