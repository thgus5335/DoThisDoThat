import { ChangeEvent } from 'react';
import styles from './CommentInput.module.scss';
import CommentSubmitButton from '../../ModalButton/CommentButton/CommentSubmitButton';

interface CommentInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
}

const CommentInput = ({ value, onChange, onClick }: CommentInputProps) => {
  return (
    <div className={styles.commentContainer}>
      <label className={styles.label}>댓글</label>
      <div className={styles.commentBox}>
        <textarea
          className={styles.commentInput}
          placeholder="댓글 작성하기"
          value={value}
          onChange={onChange}></textarea>
        <div className={styles.submitButton}>
          <CommentSubmitButton onClick={onClick} size={'large'}>
            입력
          </CommentSubmitButton>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
