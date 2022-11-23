import { render, screen, fireEvent } from "@testing-library/react-native";

import Focus from "../../src/features/Focus";
test("check the state of the temp focus", () => {
  const mockFn = jest.fn();

  render(<Focus validateFocus={mockFn} />);
  const focusInput = screen.getByPlaceholderText(
    "What did you want to focus on ?"
  );
  let ramdonFocus = "some ramdon focus";
  fireEvent.changeText(focusInput, ramdonFocus);
  fireEvent.press(screen.getByText("Go"));

  expect(mockFn).toBeCalledWith(ramdonFocus);
});
