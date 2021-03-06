import * as React from "react";
import styled from "styled-components";
import { STANDARD_TUNING } from "../consts";
import { FretboardContext } from "../store";
import { String } from "./string";
import { Legend } from "./legend";

// CSS
interface CSSProps {}

const ContainerDiv = styled.div<CSSProps>`
	font-family: Arial;
	position: absolute;
	top: 40px;
`;

const FretboardDiv = styled.div<CSSProps>`
	display: flex;
	flex-direction: column;
	width: 2000px;
`;

const ButtonBank = styled.div<CSSProps>`
	display: flex;
	align-items: center;
	font-size: 10px;
	position: fixed;
	height: 40px;
`;

const ButtonContainer = styled.div<CSSProps>`
	margin: 10px;
	height: 40px;
`;

const ButtonInput = styled.button<CSSProps>`
	height: 30px;
	font-size: 14px;
`;

// Component
interface Props {}

export const Fretboard: React.FC<Props> = () => {
	const { state, dispatch } = React.useContext(FretboardContext);

	function onKeyPress(this: Window, e: KeyboardEvent): any {
		if (e.key === "ArrowRight") {
			e.preventDefault();
			dispatch({ type: "INCREMENT_POSITION" });
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			dispatch({ type: "DECREMENT_POSITION" });
		}
	}

	React.useEffect(() => {
		window.addEventListener("keydown", onKeyPress);
		// ✅  compiles
		return () => {
			window.removeEventListener("keydown", onKeyPress);
		};
	});

	const strings = STANDARD_TUNING.map((value, i) => {
		return <String stringIndex={i} base={value} key={`string-${i}`} />;
	});

	function onInvert(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		e.preventDefault();
		if (state.invert) {
			window.scroll(0, 0);
		} else {
			window.scroll(document.body.scrollWidth, 0);
		}
		dispatch({ type: "INVERT" });
	}

	return (
		<div>
			<ButtonBank>
				<ButtonContainer>
					<ButtonInput onClick={() => dispatch({ type: "CLEAR" })}>
						Clear
					</ButtonInput>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonInput onClick={onInvert}>Invert</ButtonInput>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonInput
						onClick={() => dispatch({ type: "SET_LABEL", payload: "sharp" })}
					>
						Sharp
					</ButtonInput>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonInput
						onClick={() => dispatch({ type: "SET_LABEL", payload: "flat" })}
					>
						Flat
					</ButtonInput>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonInput
						onClick={() => dispatch({ type: "SET_LABEL", payload: "value" })}
					>
						Value
					</ButtonInput>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonInput onClick={() => dispatch({ type: "INCREMENT_POSITION" })}>
						&#43;
					</ButtonInput>
				</ButtonContainer>
				<ButtonContainer>
					<ButtonInput onClick={() => dispatch({ type: "DECREMENT_POSITION" })}>
						&minus;
					</ButtonInput>
				</ButtonContainer>
			</ButtonBank>
			<ContainerDiv>
				<FretboardDiv>
					<Legend />
					{state.invert ? strings : strings.reverse()}
					<Legend />
				</FretboardDiv>
			</ContainerDiv>
		</div>
	);
};
