import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/fonts/camera_flip_ios/selection.json';

// We use the IcoMoon app (https://icomoon.io) to generate a custom font made up
// of SVG icons. The actual font file is loaded up-front in src/camera_flip_ios.js.
export default createIconSetFromIcoMoon(icoMoonConfig, 'camera_flip_ios');
