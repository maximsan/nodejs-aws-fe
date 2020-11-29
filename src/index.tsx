import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Spinner} from './components/Spinner/Spinner';
import {Alert} from 'components/Notification/Notification';
import { Interceptor } from 'components/Interceptor';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline/>
            <Suspense fallback={<Spinner/>}>
                <>
                    <Interceptor/>
                    <Alert/>
                    <App/>
                </>
            </Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
