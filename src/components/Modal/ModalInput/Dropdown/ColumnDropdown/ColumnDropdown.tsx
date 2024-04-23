import { useState } from 'react';
import styles from './ColumnDropdown.module.scss';

type ColumnData = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

const data: ColumnData[] = [
  {
    id: 19874,
    title: '주의) 컬럼명 길게하면 안됩니다',
    teamId: '1-7',
    dashboardId: 5911,
    createdAt: '2024-04-16T06:20:41.330Z',
    updatedAt: '2024-04-16T16:16:56.186Z',
  },
  {
    id: 19877,
    title: '떡잎방범대🌱',
    teamId: '1-7',
    dashboardId: 5911,
    createdAt: '2024-04-16T15:23:51.837Z',
    updatedAt: '2024-04-16T16:01:27.691Z',
  },
  {
    id: 19886,
    title: '겸둥이들',
    teamId: '1-7',
    dashboardId: 5911,
    createdAt: '2024-04-16T15:59:38.507Z',
    updatedAt: '2024-04-16T15:59:38.507Z',
  },
  {
    id: 20334,
    title: '안녕안녕 나는 승이버섯',
    teamId: '1-7',
    dashboardId: 5911,
    createdAt: '2024-04-18T21:48:13.344Z',
    updatedAt: '2024-04-18T21:48:13.344Z',
  },
];

const ColumnDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleSelectColumn = (title: string) => {
    setSelectedColumn(title);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropDownContainer}>
      <label className={styles.label}>상태</label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={selectedColumn}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          placeholder="컬럼명"
          className={styles.input}
        />
        {isOpen && (
          <ul className={styles.ulContainer}>
            {data.map(item => (
              <li
                key={item.id}
                className={styles.liContainer}
                //onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'lavender')}
                //onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                onClick={() => handleSelectColumn(item.title)}>
                <span className={styles.circle}>•</span>
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ColumnDropdown;
