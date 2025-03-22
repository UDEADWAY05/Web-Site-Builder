import { Routes, Route } from 'react-router-dom';
import { Main } from 'src/pages/main';
import { RoutePaths } from './paths';

export const AppRoutes = () => (
    <Routes>
        <Route path={RoutePaths.MAIN} element={<Main />} />
    </Routes>
);