import 'styled-components';
import { ThemeProps } from '@geminotes/themes/ThemeProps';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeProps {} // Extend DefaultTheme with ThemeProps
}
