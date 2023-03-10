import './App.css';
import { Row, Col } from 'antd';
import UserCard from './components/UserCard';
import Loader from './components/Loader';

import { useSelector, useDispatch } from 'react-redux';
import { remove, set } from './store/userDataSlice.js';

function App() {
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();

  const items = JSON.parse(localStorage.getItem('persist:root'));

  if (!items) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((res) => {
        dispatch(set(res));
        localStorage.setItem('lastUpdated', JSON.stringify(Date.now()));
      });
  }

  const removeItemHandler = (id) => {
    // setUserData(userData.filter((user) => user.id !== id));
    dispatch(remove(id));
  };

  return (
    <div className="App">
      {userData.length === 0 ? (
        <Loader />
      ) : (
        <Row gutter={[16, 16]}>
          {userData.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id}>
              <UserCard
                uid={user.id}
                userName={user.username}
                email={user.email}
                phone={user.phone}
                website={user.website}
                remove={removeItemHandler}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default App;
