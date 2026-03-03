export const users = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    role: "student",
    balance: 850,
    avatar: "https://readdy.ai/api/search-image?query=professional%20male%20student%20portrait%20smiling%20confident%20young%20man%20with%20modern%20casual%20style%2C%20clean%20background%2C%20warm%20lighting%2C%20friendly%20expression%2C%20high%20quality%20headshot%20photography&width=200&height=200&seq=user1&orientation=squarish",
    enrolledCourses: [1, 3],
    completedCourses: [3],
    joinDate: "2023-09-15"
  },
  {
    id: 2,
    name: "Sophie Martin",
    email: "sophie.martin@email.com",
    role: "instructor",
    avatar: "https://readdy.ai/api/search-image?query=professional%20female%20instructor%20portrait%20confident%20woman%20with%20glasses%2C%20modern%20professional%20attire%2C%20clean%20background%2C%20natural%20lighting%2C%20friendly%20smile%2C%20high%20quality%20headshot%20photography&width=200&height=200&seq=user2&orientation=squarish",
    coursesTeaching: [1],
    joinDate: "2022-03-20"
  },
  {
    id: 3,
    name: "Dr. Ahmed Benali",
    email: "ahmed.benali@email.com",
    role: "instructor",
    avatar: "https://readdy.ai/api/search-image?query=professional%20male%20professor%20portrait%20distinguished%20man%20with%20beard%2C%20academic%20professional%20style%2C%20clean%20background%2C%20confident%20expression%2C%20high%20quality%20headshot%20photography&width=200&height=200&seq=user3&orientation=squarish",
    coursesTeaching: [2],
    joinDate: "2021-11-10"
  }
];

export const transactions = [
  {
    id: 1,
    userId: 1,
    type: "deposit",
    amount: 500,
    date: "2024-01-05",
    description: "Dépôt de fonds"
  },
  {
    id: 2,
    userId: 1,
    type: "purchase",
    amount: -299,
    courseId: 1,
    date: "2024-01-06",
    description: "Achat du cours: Développement Web Moderne"
  },
  {
    id: 3,
    userId: 1,
    type: "deposit",
    amount: 400,
    date: "2024-01-08",
    description: "Dépôt de fonds"
  },
  {
    id: 4,
    userId: 1,
    type: "purchase",
    amount: -249,
    courseId: 3,
    date: "2024-01-09",
    description: "Achat du cours: Design UX/UI Professionnel"
  }
];