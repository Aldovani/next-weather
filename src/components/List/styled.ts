import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;
export const Card = styled.li`
  background: #fefefe;
  padding: 1.5rem 0;
  border-radius: 32px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

 
`;
export const GroupList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: center;
  gap: 1rem;
  justify-content: space-evenly;
  list-style: none;

`;
export const Temp = styled.div`
  display: flex;
  align-items: baseline;

  font-weight: 700;
  gap: 1rem;

  .max {
    color: #000;
}
.min {
    
    color: #Aaaaaa;
  }
`;
const Rotate = keyframes`
  from {
    transform: rotate(0deg) ;
  }
  to {
    transform: rotate(360deg) ;
  }
` 

export const Loading = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100px;
    height: 100px;
    top:50%;
    border-radius: 100%;
    border: 5px solid #769FF1;
    border-bottom-color: transparent;
    animation: ${Rotate} 1s linear infinite;
  }

`

