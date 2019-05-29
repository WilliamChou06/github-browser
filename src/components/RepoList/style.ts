import styled from 'styled-components';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/css';


export const RepoListContainer = styled.div`
  position: relative;
  background: #f9f9fbff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 24px;
  padding-bottom: 36px;
`;

export const StyledPagination = styled(Pagination)`
  position: absolute;
  bottom: 0;
`