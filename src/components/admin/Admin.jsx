import React, { useState } from 'react';
import axios from 'axios';
const Admin = () => {
    const [formData, setFormData] = useState({
        id: '', // User ID
        title: '',
        description: '',
        github_link: '',
        technologies: '',
        images: '', // Comma-separated image URLs
    });

    const [videoFile, setVideoFile] = useState(null); // To handle live_demo file
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]); // Set the selected video file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('id', formData.id);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('github_link', formData.github_link);
        data.append('technologies', formData.technologies.split(',')); // Convert to array
        data.append('images', formData.images.split(',')); // Convert to array
        if (videoFile) {
            data.append('live_demo', videoFile); // Append the video file
        }
        console.log(data);
        try {
            const response = await axios.post('http://localhost:3003/projects/addProject', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong!');
            setSuccessMessage('');
        }
    };

    return (
        <div className="project-upload-form">
            <h2>Upload Project</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">User ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="github_link">GitHub Link:</label>
                    <input
                        type="url"
                        id="github_link"
                        name="github_link"
                        value={formData.github_link}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="technologies">Technologies (comma-separated):</label>
                    <input
                        type="text"
                        id="technologies"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="images">Images (comma-separated URLs):</label>
                    <input
                        type="text"
                        id="images"
                        name="images"
                        value={formData.images}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="live_demo">Live Demo Video:</label>
                    <input
                        type="file"
                        id="live_demo"
                        name="live_demo"
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Upload Project</button>
            </form>
        </div>
    );
};

export default Admin;
