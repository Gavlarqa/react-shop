import Paginator from '@/app/components/Paginator';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Paginator', () => {
  let mockOnChange = jest.fn();

  it('displays the current page', async () => {
    render(
      <Paginator numberOfPages={3} currentPage={0} onChange={mockOnChange} />
    );

    const option = await screen.getByRole<HTMLOptionElement>('option', {
      name: 'Page 1',
    });

    expect(await screen.getAllByRole('option').length).toBe(3);

    userEvent.selectOptions(
      screen.getByLabelText('current page'),
      screen.getByRole<HTMLOptionElement>('option', {
        name: 'Page 1',
      })
    );

    expect(option.selected).toBe(true);
  });

  it.each(
    [
      [1, 0],
      [4, 3],
    ],
    'handles selecting the page with the dropdown',
    async (displayName: number, expectedPage: number) => {
      const user = userEvent.setup();

      render(
        <Paginator numberOfPages={10} currentPage={0} onChange={mockOnChange} />
      );

      const selectList = screen.getByLabelText('current page');
      const option = screen.getByRole<HTMLOptionElement>('option', {
        name: `Page ${displayName}`,
      });

      await user.selectOptions(selectList, option);

      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe(expectedPage);
    }
  );

  it.each([
    [1, 2],
    [4, 3],
  ])(
    'handles paging from page %s to page %s',
    async (currentPage: number, targetPage: number) => {
      const user = userEvent.setup();

      render(
        <Paginator
          numberOfPages={10}
          currentPage={currentPage}
          onChange={mockOnChange}
        />
      );

      await user.click(screen.getByLabelText(`Go to Page ${targetPage}`));

      expect(mockOnChange.mock.calls.length).toBe(1);
      expect(mockOnChange.mock.calls[0][0]).toBe(targetPage);
    }
  );
});
