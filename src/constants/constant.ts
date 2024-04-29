import point1Img from '@/src/assets/images/point1Img.png';
import point2Img from '@/src/assets/images/point2Img.png';
import dashboardImg from '@/src/assets/images/dashboardImg.png';
import invitationImg from '@/src/assets/images/invitationImg.png';
import memberImg from '@/src/assets/images/memberImg.png';
import emailIcon from '@/src/assets/icons/emailIcon.svg';
import instagramIcon from '@/src/assets/icons/instagramIcon.svg';
import facebookIcon from '@/src/assets/icons/facebookIcon.svg';

export const MAIN_ARTICLE_LIST = [
  { id: 1, description: '일의 우선순위를 관리하세요', image: point1Img, width: 594, height: 498 },
  { id: 2, description: '해야 할 일을 등록하세요', image: point2Img, width: 436, height: 502 },
];

export const SUB_ARTICLE_LIST = [
  {
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
    image: dashboardImg,
    width: 300,
    height: 124,
  },
  {
    title: '초대',
    description: '새로운 팀원을 초대할 수 있어요.',
    image: invitationImg,
    width: 300,
    height: 231,
  },
  {
    title: '구성원',
    description: '구성원을 초대하고 내보낼 수 있어요.',
    image: memberImg,
    width: 300,
    height: 196,
  },
];

export const FOOTER_SOCIAL_LIST = [
  {
    id: 'email',
    href: 'https://mail.google.com/',
    image: emailIcon,
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/',
    image: instagramIcon,
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/',
    image: facebookIcon,
  },
];

export const DASHBOARD_COLOR_LIST = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];
