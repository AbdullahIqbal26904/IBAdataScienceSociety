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

        try {
            const response = await axios.post('https://portfoliobackend-cpj1.onrender.com/projects/addProject', data, {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Upload Project</h2>

                {successMessage && (
                    <p className="text-green-500 text-center mb-4">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="id" className="block text-sm font-semibold text-gray-700">User ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Project Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="github_link" className="block text-sm font-semibold text-gray-700">GitHub Link:</label>
                        <input
                            type="url"
                            id="github_link"
                            name="github_link"
                            value={formData.github_link}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="technologies" className="block text-sm font-semibold text-gray-700">Technologies (comma-separated):</label>
                        <input
                            type="text"
                            id="technologies"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="images" className="block text-sm font-semibold text-gray-700">Images (comma-separated URLs):</label>
                        <input
                            type="text"
                            id="images"
                            name="images"
                            value={formData.images}
                            onChange={handleInputChange}
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="live_demo" className="block text-sm font-semibold text-gray-700">Live Demo Video:</label>
                        <input
                            type="file"
                            id="live_demo"
                            name="live_demo"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    >
                        Upload Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
