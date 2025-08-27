import {createSlice} from '@reduxjs/toolkit';

// Static data for IBA Data Science Society
const societyData = {
    name: "IBA Data Science Society",
    tagline: "Empowering students with data-driven thinking at IBA",
    mission: "Our mission is to foster a community of data enthusiasts who collaborate, learn, and innovate together. We aim to bridge the gap between theoretical knowledge and practical applications in the field of data science.",
    vision: "To become the leading student-run organization that prepares IBA students for the data-driven future and connects them with industry opportunities.",
    about: [
        "IBA Data Science Society is a student-run organization dedicated to promoting data literacy and analytical thinking across campus.",
        "We organize workshops, hackathons, and speaker sessions to help students develop practical skills in data science, machine learning, and AI.",
        "Our community welcomes students from all academic backgrounds who share an interest in the power of data."
    ],
    events: [
        {
            title: "Python for Data Science Workshop",
            date: "October 15, 2025",
            description: "A hands-on workshop introducing Python libraries for data analysis and visualization.",
            image: "/src/assets/image.png"
        },
        {
            title: "Data Visualization Masterclass",
            date: "November 5, 2025",
            description: "Learn how to create compelling data visualizations that tell a story.",
            image: "/src/assets/image2.png"
        },
        {
            title: "Machine Learning Bootcamp",
            date: "December 10-12, 2025",
            description: "Three-day intensive bootcamp covering ML fundamentals to advanced techniques.",
            image: "/src/assets/image3.png"
        }
    ],
    dataverse: {
        title: "DataVerse 2025",
        tagline: "The flagship data science competition",
        description: "DataVerse brings together the brightest minds to solve real-world problems using data. Teams compete to develop innovative solutions for industry challenges.",
        date: "Coming March 2026",
        registration: "Registration opening soon",
        image: "/src/assets/image4.png"
    },
    gallery: [
        { image: "/src/assets/image.png", caption: "Python Workshop 2024" },
        { image: "/src/assets/image2.png", caption: "Data Visualization Session" },
        { image: "/src/assets/image3.png", caption: "Machine Learning Bootcamp" },
        { image: "/src/assets/image4.png", caption: "DataVerse 2024 Winners" },
        { image: "/src/assets/web-design.png", caption: "Team Building Session" },
        { image: "/src/assets/img_experience.png", caption: "Industry Speaker Panel" }
    ],
    socialLinks: {
        instagram: "https://instagram.com/ibadatasciencesociety",
        linkedin: "https://linkedin.com/company/iba-data-science-society",
        github: "https://github.com/iba-data-science-society",
        email: "ibadatasociety@gmail.com"
    }
}

const initialState = {
    society: societyData,
    showloader: true
}

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setshowloader: (state, action) => {
            state.showloader = action.payload;
        },
        setInitialData: (state) => {
            state.society = societyData;
        }
    }
})

export const {setshowloader, setInitialData} = portfolioSlice.actions
export default portfolioSlice.reducer