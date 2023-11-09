import { Container, HeaderWrapper } from '../style/global.ts';
import Header from '../components/Header.tsx';
import { AuthProps, Permission } from '../interface/AuthProps.ts';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance.ts';
import LoadingModal from '../components/LoadingModal.tsx';
import LemonaidLogo from '../assets/images/logo/Lemonaid-1.png';
import grade3 from '../assets/images/grade/grade3.png';
import { numberWithCommas } from '../utils/numberFormat.ts';
import { formatDateString } from '../utils/FormatDate.ts';
import { EmployerBox, ListContainer, NoneData } from '../components/List/List.tsx';
import { Employees, EmployeesBox } from './Resume.tsx';
import { useNavigate } from 'react-router-dom';

interface SearchProps extends AuthProps {
  value: string;
}

const Search: React.FC<SearchProps> = ({ authorized, permission, value }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    axiosInstance.get(`/search/search_posts_and_teachers${value}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleHireButton = (id: number) => {
    if (!authorized) {
      alert('Available after sign in');
      navigate('/sign-in');
    } else {
      setLoading(true);
      axiosInstance.get(`/user/resume?user_id=${id}`, { responseType: 'blob' })
        .then(res => {
          const blob = new Blob([res.data]);
          const contentDisposition = res.headers['content-disposition'].split('=')[1];

          const fileObjectUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = fileObjectUrl;
          link.style.display = 'none';

          // 추출된 파일 이름과 확장자를 사용하여 다운로드 파일명을 설정합니다.
          link.download = `lemonaid-${contentDisposition}`;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(() => alert('Permission denied. Plan did not exist.'))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  return (
    <Container>
      <HeaderWrapper>
        <Header authorized={authorized} permission={permission} />
      </HeaderWrapper>
      <LoadingModal isOpen={loading} />

      {
        !loading &&
        <>
          <ListContainer $type={'recruitment'} style={{ height: 'auto' }}>
            <div className={'title'}>
              Search Results: {data.teachers.length + data.posts.length} <br/>
              (posts: {data.posts.length}, teachers: {data.teachers.length})
            </div>

            <div className={'search-name'}>
              Job Posts
            </div>

            <div className={'main-container'}>
              {data.posts.length > 0 ?
                Object.values(data.posts).map((value: any, index) => (
                  <EmployerBox key={index}
                               $url={value.images ? import.meta.env.VITE_API_URL + value.images.split(',')[0] : LemonaidLogo}>
                    <div className={'employers-image'} />
                    <div className={'title'}>
                      {permission === Permission.ADMIN && <img src={grade3} alt={'grade'} />}
                      <div>{value.academy}</div>
                    </div>
                    <div className={'subtitle'}>{value.Campus}</div>
                    <div className={'bottom-container'}>
                      <div>{numberWithCommas(value.start_salary)} - {numberWithCommas(value.end_salary)} KRW</div>
                      <div>{formatDateString(value.CreatedAt)}</div>
                    </div>
                  </EmployerBox>
                ))
                : <NoneData>There is no post.</NoneData>
              }
            </div>
          </ListContainer>

          <Employees>
            <div className={'search-name'}>
              Teachers
            </div>
            {
              data.teachers.length > 0 ?
                Object.values(data.teachers).map((value: any, index: number) => (
                  <EmployeesBox key={index} $url={import.meta.env.VITE_API_URL + value.image_path}>
                    <div className={'img-container'} />
                    <div className={'text-container'}>
                      <div className={'name-container'}>
                        {value.first_name} {value.last_name}<span>{value.nationality}</span>
                      </div>
                      <div className={'hire-button-container'}>
                        <button onClick={() => handleHireButton(value.id)}>
                          Hire Now
                        </button>
                      </div>
                    </div>
                  </EmployeesBox>
                )) :
                <NoneData>There is no teachers.</NoneData>
            }
          </Employees>
        </>
      }
    </Container>
  );
};

export default Search;