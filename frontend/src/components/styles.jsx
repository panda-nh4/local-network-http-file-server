import Breadcrumb  from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import styled from "styled-components";
const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  &:not(:first-child):before {
    content: ">" !important;
    align-content: center;
    padding-top: 8px
  }
`;



export {StyledBreadcrumbItem}