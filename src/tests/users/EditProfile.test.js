import { render } from '@testing-library/react';
import { testUserContext } from "../helpers/testHelpers";
import userContext from "../../contexts/userContext";
import EditProfile from "../../users/EditProfile";

describe('UserPostControls', () => {
  const renderUserPostControls = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <EditProfile />
      </userContext.Provider>
    )
  }
  it('Renders successfully', () => {
    renderUserPostControls();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderUserPostControls();
    expect(asFragment()).toMatchSnapshot();
  });
})