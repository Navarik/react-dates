import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
// import DefaultTheme from '../theme/DefaultTheme';
// TODO: find a better way of implementing
import CustomTheme from '../theme/CustomTheme';

export default function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  ThemedStyleSheet.registerInterface(reactWithStylesInterface);
  ThemedStyleSheet.registerTheme(CustomTheme);
}
