import { React } from 'react';
import { createRoot } from 'react-dom/client';
import ColorPicker from './ColorPicker';

function App() {
  return (
    <ColorPicker />
  );
}

createRoot(document.getElementById('root')).render(<App />);
