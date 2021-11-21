import { fireEvent, render } from '@testing-library/react';
import EditCommentButton from '../../posts/EditCommentButton';

describe('EditCommentButton', () => {
  let mockSetEditMode;

  beforeEach(() => {
    mockSetEditMode = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<EditCommentButton setEditMode={mockSetEditMode} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<EditCommentButton setEditMode={mockSetEditMode} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Sets edit mode to true on click', async () => {
    const { getByText } = render(<EditCommentButton setEditMode={mockSetEditMode} />);
    const editButton = getByText('Edit Comment');
    fireEvent.click(editButton);
    expect(mockSetEditMode).toHaveBeenCalledWith(true);
  });
});
