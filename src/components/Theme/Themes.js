import { createGlobalStyle } from "styled-components";
export const lightTheme = {
    backgroundColor: "#fff",
    textColor: "#000"
};

export const darkTheme = {
    backgroundColor: "#000",
    textColor: "#fff"
};

export const GlobalStyles = createGlobalStyle`

body {
    background-color: ${props => props.theme.backgroundColor};
}
`;