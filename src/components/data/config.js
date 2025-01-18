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
    name: "Facebook",
    path: "M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.506 0-1.797.715-1.797 1.763v2.31h3.592l-.468 3.622h-3.124V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z",
    viewBox: "0 0 24 24",
    href: "https://www.facebook.com/",
  },
  {
    id: 2,
    name: "Twitter",
    path: "M23.643 4.937c-.835.37-1.732.62-2.675.733a4.658 4.658 0 0 0 2.048-2.561 9.384 9.384 0 0 1-2.946 1.127 4.672 4.672 0 0 0-7.958 4.253 13.267 13.267 0 0 1-9.645-4.889 4.667 4.667 0 0 0 1.445 6.23 4.656 4.656 0 0 1-2.115-.584v.059a4.675 4.675 0 0 0 3.745 4.577 4.697 4.697 0 0 1-2.108.08 4.677 4.677 0 0 0 4.367 3.244 9.373 9.373 0 0 1-5.804 2.002c-.377 0-.75-.022-1.12-.066a13.216 13.216 0 0 0 7.17 2.103c8.604 0 13.307-7.134 13.307-13.323 0-.203-.005-.408-.014-.611a9.532 9.532 0 0 0 2.34-2.431z",
    viewBox: "0 0 24 24",
    href: "https://twitter.com/AbdullahIqbal26",
  },
  {
    id: 3,
    name: "LinkedIn",
    path: "M22.23 0H1.77C.79 0 0 .774 0 1.73v20.54C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.73V1.73C24 .774 23.21 0 22.23 0zM7.09 20.452H3.56V9.084h3.53v11.368zM5.325 7.66a2.05 2.05 0 11.001-4.1 2.05 2.05 0 010 4.1zM20.452 20.452h-3.53V14.99c0-1.3-.025-2.971-1.814-2.971-1.813 0-2.09 1.417-2.09 2.88v5.553h-3.53V9.084h3.39v1.558h.05c.473-.895 1.63-1.837 3.356-1.837 3.59 0 4.255 2.36 4.255 5.43v6.217z",
    viewBox: "0 0 24 24",
    href: "https://www.linkedin.com/in/abdullah-iqbal-399613346/",
  },
  {
    id: 4,
    name: "GitHub",
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.04c-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.805 1.305 3.49.998.107-.774.418-1.305.762-1.604-2.665-.303-5.466-1.333-5.466-5.933 0-1.31.467-2.381 1.235-3.22-.123-.303-.536-1.523.118-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.006-.404c1.02.005 2.047.137 3.006.404 2.292-1.553 3.3-1.23 3.3-1.23.654 1.653.242 2.873.118 3.176.77.839 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.921.43.37.814 1.096.814 2.213v3.285c0 .319.192.694.801.577C20.565 21.796 24 17.298 24 12 24 5.37 18.63 0 12 0z",
    viewBox: "0 0 24 24",
    href: "https://github.com/AbdullahIqbal26904",
  }

];

export const experience = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: "Tech Solutions Inc.",
    year: '2022-Present',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, rem!',
    icon: 'https://img.icons8.com/ios-filled/64/ffffff/briefcase-settings.png'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: "StartUp", year: '2022-Present',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, rem!',
    icon: 'https://img.icons8.com/ios-filled/64/ffffff/briefcase-settings.png'
  }]