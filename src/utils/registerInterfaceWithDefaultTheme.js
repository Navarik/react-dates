import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import CustomTheme2 from '../theme/CustomTheme2';

export default function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  ThemedStyleSheet.registerInterface(reactWithStylesInterface);
  ThemedStyleSheet.registerTheme(CustomTheme2);
}
