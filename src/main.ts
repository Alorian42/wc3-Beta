import { addScriptHook } from 'w3ts';
import InitManager from './Init/Manager';

const manager = new InitManager();

addScriptHook("main::after", () => { manager.run() });