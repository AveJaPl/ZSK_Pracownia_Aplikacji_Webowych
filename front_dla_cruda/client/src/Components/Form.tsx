import React, { FormEvent, useState } from 'react';

type FormProps = {
    type: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>, data: any) => void;
};

function Form({ type, handleSubmit }: FormProps) {
    const [formData, setFormData] = useState({});

    const dataTree = {
        users: [{ email: "text", bio: "text" }],
        profiles: [{ bio: "text", userId: "number" }],
        posts: [{ title: "text", content: "text", published: "checkbox", authorId: "number" }],
        comments: [{ content: "text", postId: "number" }],
        categories: [{ name: "text" }],
        randomData: [{
            key: "text",
            value: "text"
        }]
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const formSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        handleSubmit(event, formData);
        // Reset form data
        setFormData({});
    };

    const renderInputs = () => {
        return dataTree[type].map((item, index) => (
            <div key={index} className="flex flex-col mb-4 w-full max-w-xs">
                {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                            className="rounded-lg p-2 w-full bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                            type={value === "checkbox" ? "checkbox" : value}
                            id={key}
                            name={key}
                            value={value !== "checkbox" ? formData[key] || '' : undefined}
                            checked={value === "checkbox" ? !!formData[key] : undefined}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="flex justify-center py-8">

            <form onSubmit={formSubmit} className="flex flex-col items-center w-full max-w-md bg-gray-800 p-6 rounded-lg">
                {renderInputs()}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
