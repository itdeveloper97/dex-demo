import styled from 'styled-components';

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
}

export const deviceMax = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
}

export const deviceMin = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
}

const Button = styled.button`
  cursor: pointer;
  width: 160px;
  height: 32px;
  border-radius: 4px;
  border: none;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #FFFFFF;
  
  &:focus {
    outline: none;
  }
  
  @media ${deviceMax.mobileL} {
    width: 100%;
  }
`;

export const SYellowButton = styled(Button)`
  background: #FFB800;
`;

export const SGreenButton = styled(Button)`
  background: #34C15C;
`;

export const SRedButton = styled(Button)`
  background: #FF0000;
`;

export const SInput = styled.input`
  font-size: 14px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 16px;
  height: 32px;
  width: 255px;
  margin: 8px 0px;
`;

export const STextarea = styled.textarea`
  font-size: 14px;
  margin: 8px 0px;
  padding: 8px;
`;