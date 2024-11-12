import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/ru';

import App from './App.jsx';
import { persistor, store } from './store/index.js';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				localeText={
					ruRU.components.MuiLocalizationProvider.defaultProps
						.localeText
				}
				adapterLocale="ru"
			>
				<App />
			</LocalizationProvider>
		</PersistGate>
	</Provider>
);
