import { render, screen, fireEvent } from '@testing-library/react-native';
import RoundedButton from '../../src/components/RoundedButton';

test('check the components show the title', () => {
  let title = 'rounded button'
  render(<RoundedButton title={title} />);
  const buttonText = screen.getByText(title)
  expect(buttonText).toBeTruthy();
});

test('check the components propagate the onpress', () => {
    const onPressMock = jest.fn();
    let title = 'rounded button'
    render(<RoundedButton title={title} onPress={onPressMock}/>);
    const buttonText = screen.getByText(title)
    fireEvent.press(buttonText);
    expect(onPressMock).toHaveBeenCalled()
});