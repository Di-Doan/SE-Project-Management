import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from './components/Login/LoginForm';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';
import DirectChatPage from './components/Direct Chat/DirectChatPage';

import CourseWrapper from './components/CourseWrapper/CourseWrapper';
import FindTeam from './components/FindTeam/FindTeam';
import People from './components/People/People';
import CoursesChat from './components/CoursesChat/CoursesChat';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* // password and login  */}
				<Route path='login' element={<LoginForm />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='reset-password' element={<ResetPassword />} />

				<Route element={<ProtectedRoute />}>
					<Route path='profile' element={<UserProfile />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='messages' element={<DirectChatPage />} />
					<Route path='messages/:user_id' element={<DirectChatPage />} />
					<Route path='courses/:course_id' element={<CourseWrapper />}>
						<Route path='team' element={<FindTeam />} />
						<Route path='people' element={<People />} />
						<Route path='chat/:chat_id' element={<CoursesChat />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
