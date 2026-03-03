/* eslint-disable no-undef */
import {
    courses,
    enrolledCourses,
    certifications
} from '../mocks/courses';
import {
    users,
    transactions
} from '../mocks/users';
import {
    quizQuestions
} from '../mocks/quiz';

let currentUser = users[0];
let userBalance = currentUser.balance;
let userEnrolledCourses = [...enrolledCourses];
let userTransactions = [...transactions];
let userCertifications = [...certifications];

// Permet de changer l'utilisateur connecté dynamiquement
export const setApiUser = (user) => {
    if (!user) return;
    const found = users.find(u => u.id === user.id);
    if (found) {
        currentUser = found;
        userBalance = found.balance || 0;
        userEnrolledCourses = enrolledCourses.filter(ec => {
            const ids = found.enrolledCourses || [];
            return ids.includes(ec.courseId);
        });
        userTransactions = transactions.filter(t => t.userId === found.id);
        userCertifications = [...certifications].filter(c => c.studentName === found.name);
    }
};

export const api = {
    getCourses: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(courses);
            }, 300);
        });
    },

    getCourseById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const parsedId = parseInt(id);
                if (isNaN(parsedId)) {
                    reject(new Error('ID de cours invalide'));
                    return;
                }
                const course = courses.find(c => c.id === parsedId);
                if (course) {
                    resolve(course);
                } else {
                    reject(new Error('Cours non trouvé'));
                }
            }, 300);
        });
    },

    getCurrentUser: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    ...currentUser,
                    balance: userBalance,
                    enrolledCourses: userEnrolledCourses.map(ec => ec.courseId)
                });
            }, 200);
        });
    },

    getUserBalance: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userBalance);
            }, 200);
        });
    },

    depositFunds: (amount) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                userBalance += amount;
                const transaction = {
                    id: userTransactions.length + 1,
                    userId: currentUser.id,
                    type: 'deposit',
                    amount: amount,
                    date: new Date().toISOString().split('T')[0],
                    description: 'Dépôt de fonds'
                };
                userTransactions.push(transaction);
                resolve({
                    balance: userBalance,
                    transaction
                });
            }, 500);
        });
    },

    enrollCourse: (courseId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const course = courses.find(c => c.id === courseId);
                if (!course) {
                    reject(new Error('Cours non trouvé'));
                    return;
                }

                const alreadyEnrolled = userEnrolledCourses.find(ec => ec.courseId === courseId);
                if (alreadyEnrolled) {
                    reject(new Error('Vous êtes déjà inscrit à ce cours'));
                    return;
                }

                if (userBalance < course.price) {
                    reject(new Error('Solde insuffisant'));
                    return;
                }

                userBalance -= course.price;
                const enrollment = {
                    courseId: courseId,
                    progress: 0,
                    lastAccessed: new Date().toISOString().split('T')[0],
                    completed: false
                };
                userEnrolledCourses.push(enrollment);

                const transaction = {
                    id: userTransactions.length + 1,
                    userId: currentUser.id,
                    type: 'purchase',
                    amount: -course.price,
                    courseId: courseId,
                    date: new Date().toISOString().split('T')[0],
                    description: `Achat du cours: ${course.title}`
                };
                userTransactions.push(transaction);

                resolve({
                    enrollment,
                    balance: userBalance,
                    transaction
                });
            }, 500);
        });
    },

    getEnrolledCourses: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const enrolled = userEnrolledCourses.map(ec => {
                    const course = courses.find(c => c.id === ec.courseId);
                    return {
                        ...course,
                        ...ec
                    };
                });
                resolve(enrolled);
            }, 300);
        });
    },

    getTransactions: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userTransactions.filter(t => t.userId === currentUser.id));
            }, 300);
        });
    },

    getQuizQuestions: (courseId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const questions = quizQuestions[courseId];
                if (questions) {
                    resolve(questions);
                } else {
                    reject(new Error('Quiz non disponible pour ce cours'));
                }
            }, 300);
        });
    },

    submitQuiz: (courseId, answers) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const questions = quizQuestions[courseId];
                let correctCount = 0;

                answers.forEach((answer, index) => {
                    if (answer === questions[index].correctAnswer) {
                        correctCount++;
                    }
                });

                const score = Math.round((correctCount / questions.length) * 100);
                const passed = score >= 70;

                if (passed) {
                    const enrollment = userEnrolledCourses.find(ec => ec.courseId === courseId);
                    if (enrollment) {
                        enrollment.completed = true;
                        enrollment.progress = 100;
                    }

                    const course = courses.find(c => c.id === courseId);
                    const certification = {
                        id: userCertifications.length + 1,
                        courseId: courseId,
                        courseName: course.title,
                        studentName: currentUser.name,
                        issueDate: new Date().toISOString().split('T')[0],
                        certificateNumber: `CERT-${new Date().getFullYear()}-${String(userCertifications.length + 1).padStart(3, '0')}-${courseId}`,
                        score: score
                    };
                    userCertifications.push(certification);

                    resolve({
                        passed,
                        score,
                        certification
                    });
                } else {
                    resolve({
                        passed,
                        score
                    });
                }
            }, 1000);
        });
    },

    getCertifications: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(userCertifications);
            }, 300);
        });
    },

    updateCourseProgress: (courseId, progress) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const enrollment = userEnrolledCourses.find(ec => ec.courseId === courseId);
                if (enrollment) {
                    enrollment.progress = progress;
                    enrollment.lastAccessed = new Date().toISOString().split('T')[0];
                }
                resolve(enrollment);
            }, 200);
        });
    },

    getInstructor: (userId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const id = userId || 2;
                const instructor = users.find(u => u.role === 'instructor' && u.id === id);
                const bios = {
                    2: 'Développeuse web passionnée avec plus de 8 ans d\'expérience. Spécialisée en React, Node.js et architecture logicielle moderne. Formatrice certifiée, j\'ai accompagné plus de 1 200 étudiants dans leur parcours.',
                    3: 'Docteur en Intelligence Artificielle et Machine Learning. Chercheur et enseignant depuis 12 ans, spécialisé en data science et algorithmes d\'apprentissage automatique.',
                };
                const specialities = {
                    2: 'Développement Web & React',
                    3: 'Intelligence Artificielle & Data Science',
                };
                resolve({
                    ...instructor,
                    bio: bios[id] || 'Expert passionné par la transmission du savoir.',
                    speciality: specialities[id] || 'Enseignement',
                });
            }, 200);
        });
    },

    getInstructorCourses: (userId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const id = userId || 2;
                const instructor = users.find(u => u.role === 'instructor' && u.id === id);
                const instructorCourses = courses.filter(c =>
                    instructor && instructor.coursesTeaching.includes(c.id)
                );
                resolve(instructorCourses);
            }, 300);
        });
    },
};