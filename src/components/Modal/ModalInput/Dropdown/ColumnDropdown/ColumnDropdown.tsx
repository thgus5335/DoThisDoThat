import { useState, useEffect } from 'react';
import styles from './ColumnDropdown.module.scss';
import httpClient from '@/src/apis/httpClient';

type ColumnData = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

interface ColumnDropdownProps {
  dashboardId: number;
  onColumnSelect: (columnId: number) => void;
}

const ColumnDropdown = ({ dashboardId, onColumnSelect = () => {} }: ColumnDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [columns, setColumns] = useState<ColumnData[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await httpClient.get(`/columns?dashboardId=${dashboardId}`);
        const columns = response.data.data;
        setColumns(columns);
      } catch (error) {
        console.error('담당자 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchColumns();
  }, []);

  const handleSelectColumn = (title: string, columnId: number) => {
    setSelectedColumn(title);
    setIsOpen(false);
    onColumnSelect(columnId);
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
            {columns.map(item => (
              <li
                key={item.id}
                className={styles.liContainer}
                //onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'lavender')}
                //onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                onClick={() => handleSelectColumn(item.title, item.id)}>
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
