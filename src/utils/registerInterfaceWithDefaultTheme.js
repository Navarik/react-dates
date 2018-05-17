import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import CustomTheme from '../theme/CustomTheme';

export default function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  ThemedStyleSheet.registerInterface(reactWithStylesInterface);
  ThemedStyleSheet.registerTheme(CustomTheme);
}
