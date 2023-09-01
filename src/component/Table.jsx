import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from './Modal';
import axios from 'axios';

export const Table = ({ notes }) => {
  const headerTable = ['No', 'Title', 'Date', 'Description', 'Actions'];
  const formatDate = 'dd/MM/yyyy';
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');

  const handleEdit = (element) => {
    const dataEdit = {
      _id: element._id,
      dateEdit: element.date,
      titleEdit: element.title,
      descriptionEdit: element.description,
      isEditData: true,
    };
    navigate('/', { state: dataEdit, replace: true });
  };

  const handleDelete = (id) => {
    setId(id);
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOke = async () => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    setShowModal(false);
  };

  return (
    <div className="wrapper-content">
      <table className=" mx-auto ">
        <thead className="border-b bg-neutral-800 font-medium text-white">
          <tr>
            {headerTable.map((element, index) => (
              <th key={index}>{element}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {notes.map((element, index) => {
            return (
              <tr key={element._id} className="hover:bg-neutral-100">
                <td className="border-cell">{index + 1}</td>
                <td className="border-cell">{element.title}</td>
                <td className="border-cell">{format(new Date(element.date), formatDate)}</td>
                <td className="border-cell">{element.description}</td>
                <td className="border-cell flex justify-center items-center">
                  <button className="btn btn-blue mr-1" onClick={() => handleEdit(element)}>
                    Edit
                  </button>
                  <button className="btn btn-red" onClick={() => handleDelete(element._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal hidden={showModal ? '' : 'hidden'} handleCancel={handleCancel} handleOke={handleOke} />
    </div>
  );
};

Table.propTypes = {
  notes: PropTypes.array.isRequired,
};
