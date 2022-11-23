import { render, screen, fireEvent } from "@testing-library/react-native";

import Historic from "../../src/features/Historic";
const focuslist = [
  { id: "1", title: "focus subject 1", status: false },
  { id: "2", title: "focus subject 2", status: true },
];
test("check that correcly rendered when focuslist is empty", () => {
  render(<Historic focusList={[]} />);
  expect(screen.getByText("Nothing yet")).toBeTruthy();
});

test("check that the focust list is rendered wiht not empty list", () => {
  render(<Historic focusList={focuslist} />);
  const focusSubjectOne = screen.getByText(focuslist[0].title);
  expect(focusSubjectOne).toBeTruthy();
  expect(focusSubjectOne.props.style.color).toEqual("red");
  const focusSubjectTwo = screen.getByText(focuslist[1].title);
  expect(focusSubjectTwo).toBeTruthy();
  expect(focusSubjectTwo.props.style.color).toEqual("green");
});

test("check when clear button is pressed then clear function is called", () => {
  const clearHistorymock = jest.fn();
  render(<Historic focusList={focuslist} clearHistory={clearHistorymock} />);
  clearButton = screen.getByText("clear");
  expect(clearButton).toBeTruthy();
  fireEvent.press(clearButton);
  expect(clearHistorymock).toBeCalled();
});

test("check that on press a subject then the focusSubject function is called", () => {
  const focusSubjectmock = jest.fn();
  render(<Historic focusList={focuslist} focusSubject={focusSubjectmock} />);
  fireEvent.press(screen.getByText(focuslist[0].title));
  expect(focusSubjectmock).toBeCalledWith(focuslist[0]);
});
