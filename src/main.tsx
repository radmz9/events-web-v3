import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { ModalManager } from './features/modals/components/ModalManager';
import { Toaster } from 'sonner';
import App from './App'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PersistGate } from 'redux-persist/integration/react';

dayjs.extend(relativeTime);
dayjs.locale('es');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors position='top-center' closeButton expand={false} />
      <ModalManager />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
