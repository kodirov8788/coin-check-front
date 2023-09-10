import { Route, Navigate, Routes } from 'react-router-dom';

function PrivateRoute({ path, element, authenticated }) {
    return authenticated ? (
        <Routes>
            <Route path={path} element={element} />
        </Routes>
    ) : (
        <Navigate to="/login" />
    );
}

export default PrivateRoute