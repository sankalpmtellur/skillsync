import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
    User, Mail, MapPin, Calendar, Briefcase, Github, Linkedin, Globe
} from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await axios.get("http://localhost:3000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data) {
                    setUser(res.data);
                } else {
                    navigate("/login");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please log in to access this page</h1>
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Custom Navbar */}
            <nav className="bg-white shadow-md py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.avatar || "/src/assets/avatars/default-avatar.png"}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border border-gray-300"
                        />
                        <h1 className="text-xl font-bold text-gray-800">Welcome, {user.name}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate("/projects")}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => navigate("/explore")}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Connections
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center space-x-6 mb-6 md:mb-0">
                                <img
                                    src={user.avatar || "/src/assets/avatars/default-avatar.png"}
                                    alt={user.name}
                                    className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
                                />
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                                    <p className="text-lg text-blue-100 mb-2">{user.title}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {user.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            Joined {new Date(user.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Profile Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Profile Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-6">About</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {user.bio}
                            </p>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-6">Skills</h2>
                            <div className="flex flex-wrap gap-3">
                                {user.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Contact Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        {user.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">{user.experience} experience</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-600">{user.location}</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-medium text-gray-700 mb-4">Social Links</h3>
                                <div className="flex gap-3">
                                    <a
                                        href={`https://github.com/${user.github}`}
                                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="w-5 h-5 text-gray-600" />
                                    </a>
                                    <a
                                        href={`https://linkedin.com/in/${user.linkedin}`}
                                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Linkedin className="w-5 h-5 text-gray-600" />
                                    </a>
                                    <a
                                        href={user.website}
                                        className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Globe className="w-5 h-5 text-gray-600" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;