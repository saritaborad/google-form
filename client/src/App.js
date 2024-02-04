import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import QuestionForm from "./components/QuestionForm";
import Template from "./components/Template";
import FormHeader from "./components/FormHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Userform from "./components/Userform";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Header />
								<Template />
								<MainLayout />
							</>
						}
					/>
					<Route
						path="/form/:id"
						element={
							<>
								<FormHeader />
								<QuestionForm />
							</>
						}
					/>
					<Route
						path="/response"
						element={
							<>
								<Userform />
							</>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
