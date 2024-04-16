import styles from './index.module.scss';
import Input from '../src/components/common/Input/index';

export default function Home() {
  return (
    <>
      <p className={styles.test}>main</p>
      <Input />
    </>
  );
}
