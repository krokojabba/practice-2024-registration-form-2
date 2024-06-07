import init from './init';
import { renderForm, renderFormFields } from './view';
import app from './app';
import  './styles.css';

const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));

const initState = init();
app(initState, cloneDeep(initState), renderForm, renderFormFields);
