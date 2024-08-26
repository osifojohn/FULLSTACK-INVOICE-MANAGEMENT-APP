'use client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ISelect {
  startDate?: Date;
  setStartDate: (val: Date | undefined) => void;
}

const SelectMonthYear = ({ startDate, setStartDate }: ISelect) => {
  const maxDate = new Date();

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as Date | undefined)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      maxDate={maxDate}
      placeholderText="Last 365 days"
    />
  );
};

export default SelectMonthYear;
