import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { auth } from './lib/firebase';
import { setUser } from './redux/features/user/userSlice';
import { useAppDispatch } from './redux/hook';

function App() {
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user.email));
    } else {
      dispatch(setUser(null));
    }
  });

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
