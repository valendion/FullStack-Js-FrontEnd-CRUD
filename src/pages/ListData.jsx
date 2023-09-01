import { Table } from '../component/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const ListData = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  });

  const getNotes = async () => {
    const response = await axios.get('http://localhost:5000/notes');
    setNotes(response.data);
  };

  return (
    <div className="wrapper-parent-page">
      <Table notes={notes} />
    </div>
  );
};
