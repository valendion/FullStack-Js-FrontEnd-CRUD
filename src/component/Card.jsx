import PropTypes from 'prop-types';
export const Card = ({ title, date, description, onSubmit, inputTitle, inputDate, inputDescription, isEdit }) => {
  return (
    <div className="wrapper-content content-center">
      <form onSubmit={onSubmit}>
        <input type="text" className="placeholder:italic border-input w-full" placeholder={'Title'} onChange={inputTitle} value={title} />

        <input type="date" className="border-input" value={date} onChange={inputDate} />

        <textarea rows={12} className="placeholder:italic border-input w-full" placeholder={'Description'} value={description} onChange={inputDescription} />
        <div className="flex justify-end">
          <input type="submit" value={isEdit ? 'Edit' : 'Add'} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" />
        </div>
      </form>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  inputTitle: PropTypes.func.isRequired,
  inputDate: PropTypes.func.isRequired,
  inputDescription: PropTypes.func.isRequired,
};
