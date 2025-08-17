import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";

const Wrapper = styled.div``;

export default () => {
	const dispatch = useDispatch();
	return <Wrapper></Wrapper>;
};
