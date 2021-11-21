import UserPostControls from "../../posts/UserPostControls";
import { fireEvent, render } from '@testing-library/react';
import { testPost1 } from "../helpers/testHelpers";
import { MemoryRouter, Route } from "react-router";

describe('UserPostControls', () => {
  it('Renders successfully', () => {
    render(<MemoryRouter><UserPostControls post={testPost1} /></MemoryRouter>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<MemoryRouter><UserPostControls post={testPost1} /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Routes user to edit route on click of edit button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserPostControls post={testPost1} />
        <Route exact path="/clubs/1/posts/1/edit">
          Link clicked
        </Route>
      </MemoryRouter>
    );
    fireEvent.click(getByText('Edit Post'));
    getByText('Link clicked')
  });
})