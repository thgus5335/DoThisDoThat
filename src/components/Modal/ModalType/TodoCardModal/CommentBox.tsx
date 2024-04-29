import { useState } from 'react';
import { format } from 'date-fns';
import httpClient from '@/src/apis/httpClient';
import styles from './CommentBox.module.scss';
import router from 'next/router';

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
  onDeleteComment?: (commentId: number) => Promise<void>;
}

const CommentBox = ({ data, onDeleteComment }: CommentBoxProps) => {
  const [commentEdit, setCommentEdit] = useState<string>(data?.content);
  const [isModify, setIsModify] = useState<boolean>(false);

  //댓글 입력창 핸들러
  const handleCommentEditInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentEdit(e.target.value);
  };

  //날짜 포맷 함수
  const formatDate = (date: string) => {
    return format(date, 'yyyy.MM.dd HH:mm');
  };

  //댓글 수정 핸들러
  const handleCommentEdit = async (commentId: number, content: string) => {
    try {
      const response = await httpClient.put(`/comments/${commentId}`, {
        content: content,
      });
      console.log('댓글 수정 성공:', response.data);
      window.alert('댓글이 수정되었습니다.');
      router.reload();
      ///fetchCommentData();
      //fetchCommentData(cursorId);
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  //로그인된 사용자의 아이디를 토큰으로부터 가져오기
  function getIdFromJWT() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('토큰이 저장되어 있지 않습니다.');
      return null;
    }

    try {
      // JWT의 payload 부분만 디코딩
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        console.log('토큰 형식이 올바르지 않습니다.');
        return null;
      }
      // Base64로 인코딩된 URL을 디코딩
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      // JSON 객체로 파싱
      const parsedPayload = JSON.parse(payload);
      // 아이디를 추출
      const id = parsedPayload.id;
      return id;
    } catch (error) {
      console.error('토큰 디코드 중 오류가 발생했습니다:', error);
      return null;
    }
  }

  // 사용자 ID 추출
  const userId = getIdFromJWT();

  return (
    <div className={styles.commentContainer}>
      <img
        src={data?.author?.profileImageUrl ? data?.author?.profileImageUrl : '/assets/images/defaultUser.png'}
        alt="프로필 이미지"
        className={styles.commentAuthorProfile}
      />
      <div className={styles.commentBox}>
        <div className={styles.commentAuthor}>
          <span className={styles.commentAuthorNickname}>{data?.author?.nickname}</span>
          <div className={styles.commentDate}>{formatDate(data?.createdAt)}</div>
        </div>
        {isModify ? (
          <>
            <textarea className={styles.editInput} value={commentEdit} onChange={handleCommentEditInput} />
            <div className={styles.commentMenu}>
              <button className={styles.commentEdit} onClick={() => handleCommentEdit(data.id, commentEdit)}>
                수정사항 저장
              </button>
              <button className={styles.commentDelete} onClick={() => setIsModify(false)}>
                수정 취소
              </button>
            </div>
          </>
        ) : (
          <div className={styles.commentContent}>{data?.content}</div>
        )}
        {data?.author?.id === userId ? ( //담당자 id가 아니라, 로그인된 id로 비교해야함;;
          <div className={styles.commentMenu}>
            <button className={styles.commentEdit} onClick={() => setIsModify(true)}>
              수정
            </button>
            <button className={styles.commentDelete} onClick={() => onDeleteComment && onDeleteComment(data?.id)}>
              삭제
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentBox;
