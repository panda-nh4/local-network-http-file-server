import Breadcrumb  from 'react-bootstrap/Breadcrumb';
import styled from "styled-components";
const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  &:not(:first-child):before {
    content: ">" !important;
  }
`;


export {StyledBreadcrumbItem}