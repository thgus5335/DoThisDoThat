import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  return (
    <div style={{ border: '1px solid black' }}>
      <DatePicker
        selected={selectedDateTime}
        onChange={(date: Date) => setSelectedDateTime(date)}
        dateFormat="yyyy.MM.dd HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15} // 15분 간격으로 시간 선택 가능
        showPopperArrow={false}
      />
    </div>
  );
};

export default DateInput;
