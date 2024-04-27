import styles from './CommentBox.module.scss';
import { format } from 'date-fns';

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
};

interface CommentBoxProps {
  data: Comment;
  assigneeId: number | undefined;
  onDeleteComment?: (commentId: number) => Promise<void>;
  onEditComment?: (commentId: number, content: string) => Promise<void>;
}

const CommentBox = ({ data, assigneeId, onDeleteComment, onEditComment }: CommentBoxProps) => {
  const formatDate = (date: string) => {
    return format(date, 'yyyy.MM.dd HH:mm');
  };

  return (
    <div className={styles.commentContainer}>
      <img
        src={data.author?.profileImageUrl ? data.author?.profileImageUrl : '/assets/images/defaultUser.png'}
        alt="프로필 이미지"
        className={styles.commentAuthorProfile}
      />
      <div className={styles.commentBox}>
        <div className={styles.commentAuthor}>
          <span className={styles.commentAuthorNickname}>{data.author?.nickname}</span>
          <div className={styles.commentDate}>{formatDate(data.createdAt)}</div>
        </div>
        <div className={styles.commentContent}>{data.content}</div>
        {data.author?.id === assigneeId ? ( //담당자 id가 아니라, 로그인된 id로 비교해야함;;
          <div className={styles.commentMenu}>
            <button className={styles.commentEdit}>수정</button>
            <button className={styles.commentDelete} onClick={() => onDeleteComment && onDeleteComment(data.id)}>
              삭제
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentBox;
