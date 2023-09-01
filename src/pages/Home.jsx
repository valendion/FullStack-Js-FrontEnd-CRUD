import { useState } from 'react';
import { Card } from '../component/Card';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Home = () => {
  const formatDate = 'yyyy-MM-dd';
  const [currentDate, setCurrentDate] = useState(format(new Date(), formatDate));
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { dateEdit, titleEdit, descriptionEdit, isEditData, _id } = location.state;
      setIsEdit(isEditData);
      setTitle(titleEdit);
      setId(_id);
      setdescription(descriptionEdit);
      setCurrentDate(format(new Date(dateEdit), formatDate));
      console.log('dataSend', location.state);
    }
  }, [location.state]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(isEdit);
      if (isEdit) {
        await axios.patch(`http://localhost:5000/notes/${id}`, {
          date: new Date(currentDate),
          title: title,
          description: description,
        });
      } else {
        await axios.post('http://localhost:5000/notes', {
          date: new Date(currentDate),
          title: title,
          description: description,
        });
      }

      navigate('/list-data');
    } catch (error) {
      console.log(error);
    }
  };

  const inputDate = (event) => {
    setCurrentDate(event.target.value);
  };

  const inputTitle = (event) => {
    setTitle(event.target.value);
  };

  const inputDescription = (event) => {
    setdescription(event.target.value);
  };
  return (
    <div className="wrapper-parent-page">
      <Card title={title} date={currentDate} description={description} onSubmit={onSubmit} inputDate={inputDate} inputTitle={inputTitle} inputDescription={inputDescription} isEdit={isEdit} />
    </div>
  );
};
