import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './TodoCardModal.module.scss';
import Image from 'next/image';
import httpClient from '@/src/apis/httpClient';
import useModal from '@/src/hooks/useModal';
import DoubleButtonModal from '../../DoubleButtonModal';
import TodoEditModal from '../TodoEditModal/TodoEditModal';
import TagChip from '../../ModalInput/TagInput/TagChip';
import CommentInput from '../../ModalInput/CommentInput/CommentInput';
import CommentBox from './CommentBox';
import kebab from '@/src/assets/icons/kebab.svg';

type Card = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
  imageUrl?: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
};

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

type ColumnData = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  cardId: number;
  dashboardId: number;
}

const TodoCardModal = ({ cardId, dashboardId }: Props) => {
  const [cardData, setCardData] = useState<Card>();
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [columnTitle, setColumnTitle] = useState<string | undefined>('');
  const [commentInput, setCommentInput] = useState<string>('');
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);
  const { modalState, openModal, closeModal } = useModal();
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1 });

  //카드 데이터 가져오기
  const fetchCardData = async () => {
    try {
      const response = await httpClient.get(`/cards/${cardId}`);
      setCardData(response.data);
    } catch (error) {
      console.error('카드 데이터 가져오기 실패:', error);
    }
  };

  //댓글 데이터 가져오기
  const fetchCommentData = async (cursorId: number | null) => {
    try {
      setLoading(true);
      const cursorParam = cursorId ? `&cursorId=${cursorId}` : '';
      const response = await httpClient.get(`/comments?size=10${cursorParam}&cardId=${cardId}`);
      setCommentData(prev => [...prev, ...response.data.comments]);
      setCursorId(response.data.cursorId);
      setLoading(false);
      //const response = await httpClient.get(`/comments?size=10&cardId=${cardId}`);
      //setCommentData(response.data.comments);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('댓글 데이터 가져오기 실패:', error);
      setLoading(false);
    }
  };

  //컬럼명(상태) 가져오기
  const fetchColumnTitle = async () => {
    try {
      const response = await httpClient.get(`/columns?dashboardId=${dashboardId}`);
      const column = response.data.data.find((column: ColumnData) => column.id === cardData?.columnId);
      setColumnTitle(column?.title);
      console.log(column?.title);
    } catch (error) {
      console.error('컬럼 데이터 가져오기 실패:', error);
    }
  };

  //컴포넌트가 마운트되면 카드 데이터, 댓글 데이터, 컬럼명 가져오기
  useEffect(() => {
    fetchCardData();
    fetchCommentData(null);
    fetchColumnTitle();
  }, []);

  //무한 스크롤로 댓글 데이터 추가로 가져오기
  useEffect(() => {
    if (inView && cursorId && !loading) {
      fetchCommentData(cursorId);
    }
  }, [inView, cursorId, loading]);

  //댓글 입력창 핸들러
  const handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  //댓글 제출 핸들러
  const handleCommentSubmit = async () => {
    try {
      const response = await httpClient.post('/comments', {
        content: commentInput,
        cardId: cardData?.id,
        columnId: cardData?.columnId,
        dashboardId: cardData?.dashboardId,
      });
      console.log('댓글 작성 성공:', response.data);
      window.alert('댓글이 작성되었습니다.');
      window.location.reload();
      //setCommentData(currentComments => [...currentComments, response.data.comment]);
      //fetchCommentData();
      fetchCommentData(cursorId);
      setCommentInput('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  //댓글 삭제 핸들러
  const handleCommentDelete = async (commentId: number) => {
    try {
      const response = await httpClient.delete(`/comments/${commentId}`);
      console.log('댓글 삭제 성공:', response.data);
      window.alert('댓글이 삭제되었습니다.');
      window.location.reload();
      //setCommentData(currentComments => currentComments.filter(comment => comment.id !== commentId));
      //fetchCommentData();
      fetchCommentData(cursorId);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  //카드 삭제 핸들러
  const handleCardDelete = async () => {
    try {
      const response = await httpClient.delete(`/cards/${cardId}`);
      console.log('카드 삭제 성공', response.data);
      closeModal();
    } catch (error) {
      console.error('카드 삭제 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.kebabBox}>
        <button onClick={() => setIsKebabOpen(!isKebabOpen)}>
          <Image className={styles.kebab} src={kebab} width={28} height={28} alt="케밥" />
        </button>
        {isKebabOpen && (
          <div className={styles.popOver}>
            <button className={styles.option} onClick={openModal}>
              수정하기
            </button>
            <button className={styles.option} onClick={handleCardDelete}>
              삭제하기
            </button>
          </div>
        )}
        {modalState && cardData && (
          <DoubleButtonModal size={'large'} isOpen={modalState} onClose={closeModal}>
            <TodoEditModal data={cardData} cardId={cardId} dashboardId={dashboardId} />
          </DoubleButtonModal>
        )}
      </div>
      <div className={styles.contentBox}>
        <div className={styles.title}>{cardData?.title}</div>
        <div className={styles.chipBox}>
          <div className={styles.columnChip}>
            <span className={styles.circle}>•</span>
            {columnTitle}
          </div>
          <div className={styles.line}> | </div>
          <div className={styles.tagChip}>
            {cardData?.tags.map((name, index) => (
              <TagChip key={index} name={name} />
            ))}
          </div>
        </div>
        <div className={styles.description}>{cardData?.description}</div>
        {cardData?.imageUrl && <img src={cardData?.imageUrl} className={styles.todoImage} />}
        <CommentInput value={commentInput} onChange={handleCommentInput} onClick={handleCommentSubmit} />
        <div>
          {commentData.length > 0 && (
            <div className={styles.commentBox}>
              {commentData?.map(comment => (
                <CommentBox
                  key={comment?.id}
                  data={comment}
                  assigneeId={cardData?.assignee?.id}
                  onDeleteComment={handleCommentDelete}
                />
              ))}
              <div ref={ref} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.assigneeBox}>
          <div className={styles.assigneeTitle}>담당자</div>
          <div className={styles.assigneeProfile}>
            <img src={cardData?.assignee?.profileImageUrl} className={styles.profileImage} />
            <div className={styles.assigneeNickname}>{cardData?.assignee?.nickname}</div>
          </div>
        </div>
        <div className={styles.dueDateBox}>
          <div className={styles.dueDateTitle}>마감일</div>
          <div className={styles.dueDate}>{cardData?.dueDate}</div>
        </div>
      </div>
    </div>
  );
};

export default TodoCardModal;
