import "./App.css";
import Table from "./Components/Table";
import Form from "./Components/Form";
import { ChangeEvent, useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("users");
  const [error, setError] = useState(null);
  const [modalSent, setModalSent] = useState(false);
  const [message, setMessage] = useState(null);

  const setTempError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  const setTempMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  // Refactored fetchData into a reusable function
  const fetchData = async (currentType: string) => {
    try {
      if (currentType === "randomData") {
        return
      }
      const response = await fetch(`http://localhost:3000/${currentType}`); 
      const newData = await response.json();
      console.log(newData);
      if (newData) {
        setData(newData); 
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data: any = {};
    const formElements = event.target.elements;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;

      if (element.name) {
       
        if (element.type === "checkbox") {
          data[element.name] = element.checked;
        } else {
          // For other input types, use the FormData value
          data[element.name] = formData.get(element.name);
        }
        if (element.name === "authorId") {
          // Convert authorId to number
          data[element.name] = Number(formData.get(element.name));
        }
      }
    }

    console.log(data);

    try {
      const response = await fetch(`http://localhost:3000/${type}`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await fetchData(type)
        setTempMessage("Data added successfully");

      }
      const responseData = await response.json();
      if(responseData.error) {
        setTempError(responseData.error);
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(type);
  }, [type,modalSent]); // Dependency on 'type' to fetch data when it changes

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const onModalSubmit = async () => {
    setModalSent(prevVal=>!prevVal);
  }


  return (
    <div className="bg-neutral-700 h-screen w-full">
      {error && <div className="absolute top-0 w-full bg-red-500 text-white p-2">{error}</div>}
      {message && <div className="absolute top-0 w-full bg-green-500 text-white p-2">{message}</div>}
      <div className="w-full flex items-center justify-center flex-col p-4 rounded-lg">
        <select
          className="bg-white p-2 rounded-lg"
          onChange={handleChange}
          value={type}
        >
          <option value="users">Users</option>
          <option value="profiles">Profiles</option>
          <option value="posts">Posts</option>
          <option value="comments">Comments</option>
          <option value="categories">Categories</option>
          <option value="randomData">RandomData</option>
        </select>
      </div>
      <Table data={data} type={type} onModalSubmit={onModalSubmit} />
      <Form type={type} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
