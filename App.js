
import Routes from './src/routes/Routes';
import { AuthProvider } from './src/context/auth';
import { CartProvider } from './src/context/cart';

export default function App() {
    //ADICIONAR PROVIDERS
  return (
        <AuthProvider>
            <CartProvider>
                <Routes/>
            </CartProvider>
        </AuthProvider>
  );
}

