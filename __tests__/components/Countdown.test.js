import { render, screen, act } from "@testing-library/react-native";
import Countdown from "../../src/components/Countdown";

test("check the components show the timer", () => {
  let minutes = '1'
  let isPaused = true;
  const defaultProgress = 1;
  const onProgressMock = jest.fn();
  render(
    <Countdown
      minutes={minutes}
      isPaused={isPaused}
      onProgress={onProgressMock}
    />
  );
  expect(screen.getByText("01:00")).toBeTruthy();
  expect(onProgressMock).toBeCalledWith(defaultProgress);
});
jest.useFakeTimers();
test('check the timer is updated and onpress is called when is not on pause', () => {
    let minutes = 0.05  // equal to 3 secondes
    let isPaused = false
    const startedProgress = 1
    const progressAfter1Seconde = 2/3
    const progressAfter2Seconde = 1/3
    const progressAfter3Seconde = 0
    const onProgressMock = jest.fn();
    const onEndMock = jest.fn();
    render(
        <Countdown
          minutes={minutes}
          isPaused={isPaused}
          onProgress={onProgressMock}
          onEnd={onEndMock}
        />
    );    
    expect(screen.getByText("00:03")).toBeTruthy();
    expect(onProgressMock).toBeCalledWith(startedProgress);
    act(() => jest.advanceTimersByTime(1000))
    expect(screen.getByText("00:02")).toBeTruthy()
    expect(onProgressMock).toBeCalledWith(progressAfter1Seconde);
    act(() => jest.advanceTimersByTime(1000))
    expect(screen.getByText("00:01")).toBeTruthy()
    expect(onProgressMock).toBeCalledWith(progressAfter2Seconde);
    act(() => jest.advanceTimersByTime(1000))
    expect(screen.getByText("00:00")).toBeTruthy()
    expect(onProgressMock).toBeCalledWith(progressAfter3Seconde);
    act(() => jest.advanceTimersByTime(1000))
});