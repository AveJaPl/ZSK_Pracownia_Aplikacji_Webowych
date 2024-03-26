import { useState } from "react";

type TableProps = {
  type: string;
  data: any[];
  onModalSubmit: () => void;
};

function Table({ type, data, onModalSubmit }: TableProps) {
  const [modalShown, setModalShown] = useState(false);
  const [modalData, setModalData] = useState({});
  const [editableData, setEditableData] = useState({});

  const renderHeaders = () => {
    const dataTree = {
      users: ["Id", "Email", "Bio"],
      profiles: ["Id", "Bio", "User Id"],
      posts: ["Id", "Title", "Content", "Published", "User Id"],
      comments: ["Id", "Content", "Post Id"],
      categories: ["Id", "Name"],
    };

    return dataTree[type].map((header, index) => (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
        key={index}
      >
        {header}
      </th>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkcja do wyświetlania modala z możliwością edycji
  const handleModalDisplay = (row) => {
    setModalData(row);
    setEditableData(row); // Ustawienie danych do edycji na początkowe wartości
    setModalShown(true);
  };

  // Funkcja do zapisywania zmian
  const saveChanges = async () => {
    console.log(editableData);
    const id = editableData.id;
    const url = `http://localhost:3000/${type}/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableData),
      });
      if (response.ok) {
        onModalSubmit();
        console.log("Zmiany zapisane pomyślnie");
      } else {
        console.error("Błąd podczas zapisywania zmian");
      }
      setModalShown(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderData = () => {
    return data.map((row, index) => (
      <tr
        key={index}
        className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
      >
        {Object.keys(row).map((key, cellIndex) => (
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
            key={cellIndex}
            onClick={() => handleModalDisplay(row)}
          >
            {row[key]?.toString()}
          </td>
        ))}
      </tr>
    ));
  };

  const deleteItem = async () => {
    const id = editableData.id;
    const url = `http://localhost:3000/${type}/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        onModalSubmit();
        console.log("Element usunięty pomyślnie");
      } else {
        console.error("Błąd podczas usuwania elementu");
      }
      setModalShown(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      {modalShown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-gray-800 w-2/3 m-auto p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">Edycja danych</h2>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => setModalShown(false)}
              >
                Zamknij
              </button>
            </div>
            {Object.entries(modalData).map(([key, value]) => (
              <div key={key} className="mb-4">
                {
                    // Pominięcie pola id, które nie jest edytowalne
                    key === "id" ? null : key==="userId" ? null : key==="authorId" ? null : key==="postId" ? null : (
                        <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                            className="rounded-lg p-2 w-full bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            id={key}
                            name={key}
                            value={editableData[key]}
                            onChange={handleChange}
                        />
                        </div>
                    )
                }
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={saveChanges}
            >
              Zapisz zmiany
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick={deleteItem}>
              Usuń
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-600 overflow-y-auto h-16">
                <thead className="bg-gray-900">
                  <tr>{type === "randomData" ? <></> : renderHeaders()}</tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {type === "randomData" ? null : renderData()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
