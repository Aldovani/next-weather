import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-areas: "main  main aside";
  
  @media(max-width: 768px) {
    grid-template-areas:  "aside"
                          "main";

                          padding: 2rem 0;
  }
`;
export const Aside = styled.aside`
  background: #fefefe;
  grid-area: aside;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
`;
export const Main = styled.main`
  background: #eff4fe;
  grid-area: main;
`;


export const CurrentDay = styled.div`
  width: 80%;
  margin: 0 auto;
  border-radius: 8px;
  background: linear-gradient(#9bbbfe, #6293f9);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
  flex-direction: column;

  .info-day {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fefefe;
    width: 100%;

    h2 {
      font-size: 2rem;
    }
  }

  .time {
    display: flex;
    align-items: center;

    height: 100%;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 1rem;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;

    h2 {
      width: 5rem;
      text-align: center;
      border-left: 1px solid #fefefe;
      font-size: 1rem;
    }
  }
`;

export const StatsSun = styled.section`
  height: 5rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: #fdfdfd;
  width: 80%;
  background-image: linear-gradient(#ffc179, #ffb25a);

  div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

export const CityName = styled.section`
  display: flex;
  align-items: center;
  gap: .5rem;
  span {
    font-size: 1.5rem;
    color: #fefefe;
  }
`;

// ============================================================
//                        Input Button Label
// ============================================================
export const Input = styled.input`
  width: 90%;
  border: 0;
  height: 2.5rem;
  padding: 1rem 0 1rem 3rem;
  border-radius: 8px;
  border-end-end-radius: 0;
  border-top-right-radius: 0;
  outline-color: #cddffe;
  border: 1px solid #c0d4fe;
  color: #c0d4fe;
  font-size: 1.2rem;

  background: url("/search.svg");
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: 10px center;

  &::placeholder {
    color: #c0d4fe;
  }
`;

export const Button = styled.button`
  border: 0;
  width: 10%;
  border-end-end-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #c0d4fe;
  background: #cddaff;
  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
export const LabelSearch = styled.label`
  position: relative;
  width: 80%;
  display: flex;
`;
