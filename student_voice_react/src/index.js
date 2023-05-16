import React from 'react';
import { createRoot } from "react-dom/client";
import App from './App';
import { QueryClientProvider} from 'react-query';
import { queryClient } from './reactQuery';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);