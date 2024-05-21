import styled from "styled-components"
import {Skeleton} from "antd"


export const FullWidthSkeletonInput = styled(Skeleton.Input)`
width: 100% !important;
margin-top: ${(props)=>props.index!=1 && 10}px !important;

`;

