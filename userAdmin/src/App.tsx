import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Tenants from "./Tenants";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Dashboard>
							<h1>Welcome to the Dashboard</h1>
						</Dashboard>
					}
				/>
				<Route path="/tenants" element={<Tenants />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

