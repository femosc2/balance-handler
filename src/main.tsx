/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reduxStore from "@/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";

const queryClient = new QueryClient();

const firebaseConfig = {
  apiKey: "AIzaSyDmdhyfs_9tfP2JqR5VNwKxInG5Cg0xVpM",
  authDomain: "balance-handler.firebaseapp.com",
  projectId: "balance-handler",
  storageBucket: "balance-handler.appspot.com",
  messagingSenderId: "229664588577",
  appId: "1:229664588577:web:09e67138679ae6ec18b460",
  measurementId: "G-9J1G31PY6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);
