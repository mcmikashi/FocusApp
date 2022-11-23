import { render, screen , fireEvent, act} from "@testing-library/react-native";
import Timers from "../../src/features/Timers";

const currentFocus =  {id:'1', title:'focus subject 1', status:false}
jest.useFakeTimers();

test("check the correcly rendered the title and the focus subject is correcly rendered", () => {
  render(
    <Timers
      focusSubject={currentFocus}
    />
  );
  expect(screen.getByText('You are focusing on :')).toBeTruthy();
  expect(screen.getByText(currentFocus.title)).toBeTruthy();
});

test("check the correcly rendered the title and the focus subject is correcly rendered", () => {
    const backToSetFocusmock = jest.fn();
    render(
      <Timers
        focusSubject={currentFocus}
        backToSetFocus={backToSetFocusmock}
      />
    );
    backButton = screen.getByText('back')
    expect(backButton).toBeTruthy();
    fireEvent.press(backButton)
    expect(backToSetFocusmock).toBeCalledWith(currentFocus)
  });

test("check the button start is updated when pressed", () => {
    render(
      <Timers
        focusSubject={currentFocus}
      />
    );
    startButton = screen.getByText('start')
    expect(startButton).toBeTruthy();
    fireEvent.press(startButton)
    expect(screen.getByText('pause')).toBeTruthy();
  });

test("check that the minute is updated on press", () => {
    render(
      <Timers
        focusSubject={currentFocus}
      />
    );
    fiveminuteButton = screen.getByText('15')
    expect(fiveminuteButton).toBeTruthy();
    fireEvent.press(fiveminuteButton)
    expect(screen.getByText('start')).toBeTruthy();
    expect(screen.getByText('15:00')).toBeTruthy();
});

test("check that TimerEnd is called when timer is ended", () => {
    const timerEndmock = jest.fn();
    render(
      <Timers
        focusSubject={currentFocus}
        timerEnd={timerEndmock}

      />
    );
    buttonStart = screen.getByText('start')
    fireEvent.press(buttonStart)
    act(() => jest.advanceTimersByTime(6000))
    expect(timerEndmock).toBeCalledWith(currentFocus);
});
