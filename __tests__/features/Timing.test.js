import { render, screen, fireEvent } from "@testing-library/react-native";
import Timing from "../../src/features/Timing";

test("check the correcly rendered and on press on return the current value", () => {
  const onChangeTimermock = jest.fn();
  render(<Timing onChangeTimer={onChangeTimermock} />);
  buttonFivminute = screen.getByText("5");
  expect(buttonFivminute).toBeTruthy();
  expect(screen.getByText("10")).toBeTruthy();
  expect(screen.getByText("15")).toBeTruthy();
  expect(screen.getByText("20")).toBeTruthy();
  fireEvent.press(buttonFivminute);
  expect(onChangeTimermock).toBeCalledWith(5);
});
