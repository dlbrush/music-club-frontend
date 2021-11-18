import { render } from "@testing-library/react";
import { testUserContext } from '../helpers/testHelpers'; 
import userContext from '../../contexts/userContext';
import NewClub from "../../clubs/NewClub";

describe('NewClub', () => {
  it('Renders successfully', () => {
    render(
      <userContext.Provider value={testUserContext}>
        <NewClub />
      </userContext.Provider>
    )
  });

  it('Maintains default rendering', () => {
    const { asFragment } = render(
      <userContext.Provider value={testUserContext}>
        <NewClub />
      </userContext.Provider>
    )
    expect(asFragment()).toMatchSnapshot();
  });
});