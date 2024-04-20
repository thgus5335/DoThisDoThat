import { ChangeEvent } from 'react';
import styles from './CommentInput.module.scss';
import CommentSubmitButton from '../../ModalButton/CommentButton/CommentSubmitButton';

interface CommentInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentInput = ({ value, onChange }: CommentInputProps) => {
  return (
    <>
      <label>댓글</label>
      <textarea className={styles.input} placeholder="댓글 작성하기" value={value} onChange={onChange}></textarea>
      <CommentSubmitButton size={'large'}>입력</CommentSubmitButton>
    </>
  );
};

export default CommentInput;
