import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const Home = ({ onLogin, activeForm }) => {
  return (
    <div className="home">
      <header>
        <h1>Welcome to CodeCrafters</h1>
        <p>Manage incidents efficiently and securely.</p>
      </header>
      <div className="forms">
        {activeForm === 'login' ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <RegisterForm onLogin={onLogin} />
        )}
      </div>
    </div>
  );
};

export default Home;
