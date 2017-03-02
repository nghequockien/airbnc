import { AppRegistry, StatusBar } from 'react-native';
import setup from './app/setup';

StatusBar.setBarStyle('default');
AppRegistry.registerComponent('airbnc', setup);
