const React = require('react');
const ReactDom = require('react-dom');
require('./index.css');
var App = require('./components/App');


ReactDom.render(
    <App />,
    document.getElementById('app')
);