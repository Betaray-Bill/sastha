import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store} from './app/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <App/>
            <Toaster />
        </BrowserRouter>
    </Provider>
</StrictMode>,)
