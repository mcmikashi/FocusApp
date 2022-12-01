import { render, screen, fireEvent, act} from "@testing-library/react-native";
import App from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firstFocusSujebject = "testing my apps";
const secondFocusSujebject = "run 10 miles";

jest.useFakeTimers();

test("check the app flow is respected", () => {
  render(<App />);
  // check that the storage is loaded
  expect(AsyncStorage.getItem).toBeCalledWith('focusListHistoric');
  // first view show the focus and the historic
  const focusInput = screen.getByPlaceholderText(
    "What did you want to focus on ?"
  );
  expect(focusInput).toBeTruthy();
  expect(screen.getByText("Go")).toBeTruthy();
  expect(screen.getByText("Things you havent focus on :")).toBeTruthy();
  expect(screen.getByText("Nothing yet")).toBeTruthy();
  fireEvent.changeText(focusInput, firstFocusSujebject);
  fireEvent.press(screen.getByText("Go"));

  // the second view show the timer
  expect(screen.getByText("You are focusing on :")).toBeTruthy();
  expect(screen.getByText(firstFocusSujebject)).toBeTruthy();
  expect(screen.getByText("00:06")).toBeTruthy();
  expect(screen.getByTestId("progress-bar")).toBeTruthy();
  expect(screen.getByText("start")).toBeTruthy();
  expect(screen.getByText("5")).toBeTruthy();
  expect(screen.getByText("10")).toBeTruthy();
  expect(screen.getByText("15")).toBeTruthy();
  expect(screen.getByText("20")).toBeTruthy();
  expect(screen.getByText("back")).toBeTruthy();
  fireEvent.press(screen.getByText("back"));

  // go back the first page with a subject on the historic list
  // check that the focus is stored with async storage
  expect(AsyncStorage.setItem).toBeCalled()
  expect(screen.getByText("Things you havent focus on :")).toBeTruthy();
  subjectHistoric = screen.getByText(firstFocusSujebject);
  expect(subjectHistoric).toBeTruthy();
  expect(subjectHistoric.props.style.color).toEqual("red");
  fireEvent.press(subjectHistoric);

  // go back the timer with the historic subject
  fireEvent.press(screen.getByText("start"));
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("00:05")).toBeTruthy();
  act(() => jest.advanceTimersByTime(2000));
  expect(screen.getByText("00:03")).toBeTruthy();
  act(() => jest.advanceTimersByTime(4000));

  // when the timer is finish we go back to subject on the historic list
  updatedHistoricSubject = screen.getByText(firstFocusSujebject);
  expect(updatedHistoricSubject.props.style.color).toEqual("green");
  // the async is updated
  expect(AsyncStorage.setItem).toBeCalled()

  // then clear the historic
  expect(screen.getByText("clear")).toBeTruthy();
  fireEvent.press(screen.getByText("clear"));
  expect(screen.getByText("Nothing yet"));
  // the async storage is deleted
  expect(AsyncStorage.removeItem).toBeCalledWith('focusListHistoric')


  // add a focus subject
  fireEvent.changeText(
    screen.getByPlaceholderText("What did you want to focus on ?"),
    secondFocusSujebject
  );
  fireEvent.press(screen.getByText("Go"));
  // back to the first page
  fireEvent.press(screen.getByText("back"));
  // the async storage is called to set the new focus
  expect(AsyncStorage.setItem).toBeCalled()
  // delete the secondFocusSuject using the deleteItemHistory function
  fireEvent.press(screen.getByText("X"));
  expect(screen.getByText("Nothing yet"));
  // the async storage is called for remove the last focus subject
  expect(AsyncStorage.removeItem).toBeCalledWith('focusListHistoric')
});
