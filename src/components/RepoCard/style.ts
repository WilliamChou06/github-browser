import styled from 'styled-components';

import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';

export const StyledCard = styled(Card)`
  width: 300px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 18px !important;

`;

export const RepoIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  span {
    padding: 0 6px;
  }
`;
