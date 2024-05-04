import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (formData.name.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Name is required'
                }));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Please enter a valid email address'
            }));
            return;
        }

        if (formData.message.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                message: 'Message is required'
            }));
            return;
        }

        console.log('Form submitted:', formData);

        setFormData({
        name: '',
        email: '',
        message: ''
        });

    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 mt-12">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-5">
                
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-purple-500 ${errors.name && 'border-red-500'}`}
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-purple-500 ${errors.email && 'border-red-500'}`}
                            placeholder="Your Email"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className={`w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-purple-500 ${errors.message && 'border-red-500'}`}
                            placeholder="Your Message"
                        ></textarea>
                        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Send Message</button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default Contact;
