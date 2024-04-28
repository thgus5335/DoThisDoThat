import CommentSubmitButton from '@/src/components/Modal/ModalButton/CommentButton/CommentSubmitButton';
import ModalButton from '@/src/components/Modal/ModalButton/ModalButton';
import DateInput from '@/src/components/Modal/ModalInput/DateInput/DateInput';
import AssigneeDropdown from '@/src/components/Modal/ModalInput/Dropdown/AssigneeDropdown/AssigneeDropdown';
import ColumnDropdown from '@/src/components/Modal/ModalInput/Dropdown/ColumnDropdown/ColumnDropdown';
import ImageInput from '@/src/components/Modal/ModalInput/ImageInput/ImageInput';
import TagInput from '@/src/components/Modal/ModalInput/TagInput/TagInput';
import DoubleButtonModal from '@/src/components/Modal/DoubleButtonModal';
import useModal from '@/src/hooks/useModal';
import styles from '@/src/pages/ModalTestPage/ModalTestPage.module.scss';
import NormalInput from '@/src/components/Modal/ModalInput/NormalInput/NormalInput';
import CommentInput from '@/src/components/Modal/ModalInput/CommentInput/CommentInput';
import DescriptionInput from '@/src/components/Modal/ModalInput/NormalInput/DescriptionInput';
import TitleInput from '@/src/components/Modal/ModalInput/NormalInput/TitleInput';
import NormalModal from '@/src/components/Modal/NormalModal';
import TodoCardModal from '@/src/components/Modal/ModalType/TodoCardModal/TodoCardModal';
import TodoPostModal from '@/src/components/Modal/ModalType/TodoPostModal/TodoPostModal';
import SingleButtonModal from '@/src/components/Modal/SingleButtonModal';
import NewInviteModal from '@/src/components/Modal/ModalType/NewInviteModal/NewInviteModal';
import NewColumnModal from '@/src/components/Modal/ModalType/NewColumnModal/NewColumnModal';
import NewDashboardModal from '@/src/components/Modal/ModalType/NewDashboardModal/NewDashboardModal';
import ColumnEditDeleteModal from '@/src/components/Modal/ModalType/ColumnEditDeleteModal/ColumnEditDeleteModal';
import DeleteAlertModal from '@/src/components/Modal/ModalType/DeleteAlertModal/DeleteAlertModal';

export default function ModalTestPage() {
  const { modalState, openModal, closeModal } = useModal(); //모달 쓸 때 꼭! 필요
  const handleImageSelected = (file: File) => {
    console.log('Selected image:', file);
    //추후 서버로 업로드하는 로직 추가 예정
  };
  return (
    <div className={styles.container}>
      {/*<ModalButton size={'large'} color={'violet'}>
        확인
      </ModalButton>
      <ModalButton size={'small'} color={'violet'}>
        확인
      </ModalButton>
      <ModalButton size={'large'} color={'white'}>
        취소
      </ModalButton>
      <ModalButton size={'small'} color={'white'}>
        취소
      </ModalButton>
      <CommentSubmitButton size={'large'}>입력</CommentSubmitButton>
      <CommentSubmitButton size={'small'}>입력</CommentSubmitButton>*/}

      {/* 모달 쓰는 방법!!

         할일 카드 모달 (TodoCardModal)*/}
      <button onClick={openModal}>Open TodoCardModal</button>
      {modalState && (
        <NormalModal isOpen={modalState} onClose={closeModal}>
          <TodoCardModal />
        </NormalModal>
      )}
      {/* 할일 생성 모달 (TodoPostModal)
      <button onClick={openModal}>Open TodoPostModal</button>
      {modalState && (
        <DoubleButtonModal size={'large'} isOpen={modalState} onClose={closeModal}>
          <TodoPostModal />
        </DoubleButtonModal>
      )}*/}
      {/* 새 컬럼 생성 모달 (NewColumnModal)
      <button onClick={openModal}>Open NewColumnModal</button>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewColumnModal />
        </DoubleButtonModal>
      )}*/}
      {/* 새 대시보드 생성 모달 (NewDashboardModal)
      <button onClick={openModal}>Open NewDashboardModal</button>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewDashboardModal />
        </DoubleButtonModal>
      )}*/}
      {/* 초대 모달 (NewInviteModal)
      <button onClick={openModal}>Open NewInviteModal</button>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewInviteModal />
        </DoubleButtonModal>
      )}*/}
      {/* 컬럼 관리 모달 (ColumnEditDeleteModal)
      <button onClick={openModal}>Open ColumnEditDeleteModal</button>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <ColumnEditDeleteModal />
        </DoubleButtonModal>
      )}*/}
      {/* 컬럼 삭제 모달 (DeleteAlertModal)
      <button onClick={openModal}>Open DeleteModal</button>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <DeleteAlertModal />
        </DoubleButtonModal>
      )}*/}
      {/* 에러 메세지 모달 (SingleButtonModal 안에 children으로 에러 메세지 넣어주기)
      <button onClick={openModal}>Open ErrorModal</button>
      {modalState && (
        <SingleButtonModal isOpen={modalState} onClose={closeModal}>
          비밀번호가 일치하지 않습니다.
        </SingleButtonModal>
      )}*/}
      {/*<AssigneeDropdown />
      <ColumnDropdown />
      <ImageInput onImageChange={handleImageSelected} />
      <TagInput />
      <DateInput />
      <NormalInput inputName="이름" placeholder="새 컬럼 이름을 입력해주세요" />
      <CommentInput />
      <TitleInput />
      <DescriptionInput />*/}
    </div>
  );
}
