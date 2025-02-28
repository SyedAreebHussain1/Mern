import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignInPage, SignUpPage, TodoPage } from "./Pages/PageListAsync";
import { getFromStorage } from "./utils/storage"; // Import the getFromStorage function from the storage file

const App: React.FC = () => {
  const token = getFromStorage("token");
  return (
    <React.Fragment>
      <Routes>
        {!token && <Route path="/signup" element={<SignUpPage />} />}
        <Route path="/*" element={token ? <TodoPage /> : <SignInPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
