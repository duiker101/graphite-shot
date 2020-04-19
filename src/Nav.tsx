import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
`;

const Section = styled.div`
	margin: 0 1ch;
	color: #aaa;
`;

const Link = styled.a`
	color: teal;
	&:visited {
		color: teal;
	}
`;

export default () => {
	return (
		<Wrapper>
			<Section>
				Made By{" "}
				<Link href={"https://twitter.com/Duiker101"}>@Duiker101</Link>
			</Section>
			<Section>
				<Link href={"https://github.com/duiker101/graphite-shot"}>
					GitHub
				</Link>
			</Section>
		</Wrapper>
	);
};
