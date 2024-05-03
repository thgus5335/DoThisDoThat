import React, { useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateInput.module.scss';
import calendar from '@/src/assets/icons/calendar.svg';

interface DateInputProps {
  onDateSelect: (date: Date | null) => void;
}

const DateInput = ({ onDateSelect = () => {} }: DateInputProps) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>();

  const handleSelectDate = (date: Date | null) => {
    setSelectedDateTime(date);
    onDateSelect(date);
    console.log(date);
  };

  return (
    <div className={styles.dateContainer}>
      <label className={styles.label}>
        마감일 <span className={styles.star}>*</span>
      </label>
      <div className={styles.dateBox}>
        <Image src={calendar} width={20} height={20} alt="달력" />
        <DatePicker
          selected={selectedDateTime}
          onChange={handleSelectDate}
          dateFormat="yyyy.MM.dd HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10} // 10분 간격으로 시간 선택 가능
          showPopperArrow={false}
          placeholderText="날짜를 입력해주세요"
          className={styles.datePicker}
        />
      </div>
    </div>
  );
};

export default DateInput;
