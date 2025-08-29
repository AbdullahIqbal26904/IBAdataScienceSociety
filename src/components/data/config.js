const animationDuration = 2;

export const variants = {

  initial: { pathLength: 0, strokeOpacity: 1, fillOpacity: 0 },
  animate: {
    pathLength: 1, strokeOpacity: 0, fillOpacity: 1,
    transition: {

      duration: animationDuration,

      ease: 'easeInOut',

      strokeOpacity: {

        delay: animationDuration
      },
      fillOpacity: {
        delay: animationDuration
      }
    }
  }
};

export const socialIcons = [
  {
    id: 1,
    name: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    viewBox: "0 0 24 24",
    href: "https://www.instagram.com/dss.iba/",
  },
  {
    id: 2,
    name: "LinkedIn",
    path: "M22.23 0H1.77C.79 0 0 .774 0 1.73v20.54C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.73V1.73C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9.084h3.53v11.368zM5.325 7.66a2.05 2.05 0 11.001-4.1 2.05 2.05 0 010 4.1zM20.452 20.452h-3.53V14.99c0-1.3-.025-2.971-1.814-2.971-1.813 0-2.09 1.417-2.09 2.88v5.553h-3.53V9.084h3.39v1.558h.05c.473-.895 1.63-1.837 3.356-1.837 3.59 0 4.255 2.36 4.255 5.43v6.217z",
    viewBox: "0 0 24 24",
    href: "https://linkedin.com/company/iba-data-science-society",
  },
  {
    id: 3,
    name: "Email",
    path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    viewBox: "0 0 24 24",
    href: "mailto:dss@khi.iba.edu.pk",
  }
];

export const experience = [
  {
    id: 1,
    title: 'Host Team',
    company: "Computer Science Society IBA",
    year: '2023-2024',
    description: 'Actively contributed to organizing and managing events, ensuring seamless execution of activities, and engaging with participants to create a dynamic and welcoming environment.',
    icon: 'https://img.icons8.com/ios-filled/64/ffffff/briefcase-settings.png'
  },

  {
    id: 2,
    title: 'Module Head - Database Module',
    company: "Computer Science Society IBA",
    year: '2024-2025',
    description: 'Led the Database Module by organizing workshops, mentoring students, and overseeing project development. Focused on enhancing participants’ understanding of database concepts, SQL, and real-world application design.',
    icon: 'https://img.icons8.com/ios-filled/64/ffffff/briefcase-settings.png'
},
]