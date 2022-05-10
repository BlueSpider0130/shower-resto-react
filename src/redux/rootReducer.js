import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
// import mailReducer from './slices/mail';
// import chatReducer from './slices/chat';
// import blogReducer from './slices/blog';
import clientReducer from './slices/client';
// import productReducer from './slices/product';
// import calendarReducer from './slices/calendar';
// import kanbanReducer from './slices/kanban';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  client: clientReducer
});

export { rootPersistConfig, rootReducer };
