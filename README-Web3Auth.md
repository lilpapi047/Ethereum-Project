# Web3 Authentication dApp

Complete Web3 authentication system with wallet connection, user registration, and session management.

## 🚀 Features

- **Wallet Connection**: MetaMask and WalletConnect support
- **User Registration**: On-chain user registration with unique usernames
- **Message Signing**: Secure authentication via wallet signatures
- **Session Management**: Persistent sessions with 24-hour expiry
- **Real-time Status**: Live authentication status display
- **Error Handling**: Comprehensive error handling and loading states

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── WalletConnection.jsx     # Wallet connection UI
│   │   ├── UserRegistration.jsx     # User registration form
│   │   ├── UserLogin.jsx           # Login with message signing
│   │   ├── AuthenticationFlow.jsx   # Complete auth flow
│   │   ├── Web3AuthStatus.jsx      # Status indicator
│   │   └── ProtectedRoute.jsx      # Route protection
│   ├── hooks/
│   │   └── useAuth.js              # Authentication hook
│   ├── utils/
│   │   └── contractHelpers.js      # Contract interaction utilities
│   ├── app/
│   │   └── Web3Auth.jsx           # Authentication page
│   ├── Web3Config.js              # Wagmi configuration
│   └── main.jsx                   # App entry point
contracts/
└── UserAuthentication.sol         # Smart contract
```

## 🛠️ Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `VITE_INFURA_API_KEY`: Your Infura API key
- `VITE_CONTRACT_ADDRESS`: Deployed contract address
- `VITE_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID (optional)

### 2. Deploy Smart Contract

Deploy `contracts/UserAuthentication.sol` to Sepolia or Goerli testnet and update the contract address in your `.env.local`.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## 🔧 Usage

### Authentication Flow

1. **Visit `/auth`** - Access the authentication page
2. **Connect Wallet** - Connect MetaMask or compatible wallet
3. **Register Account** - Create account with unique username (if not registered)
4. **Sign Message** - Authenticate session with wallet signature
5. **Access dApp** - Full access to protected features

### Integration in Components

```jsx
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { 
    address, 
    isConnected, 
    isRegistered, 
    isLoggedIn, 
    userInfo,
    login, 
    logout 
  } = useAuth()

  if (!isLoggedIn) {
    return <div>Please authenticate to continue</div>
  }

  return <div>Welcome {userInfo?.username}!</div>
}
```

### Protecting Routes

```jsx
import ProtectedRoute from '../components/ProtectedRoute'

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 🔐 Security Features

- **Message Signing**: Uses wallet signatures for authentication
- **Session Expiry**: 24-hour session timeout
- **On-chain Verification**: User registration stored on blockchain
- **Username Uniqueness**: Prevents duplicate usernames
- **Error Handling**: Comprehensive error states and user feedback

## 🌐 Supported Networks

- Sepolia Testnet
- Goerli Testnet (deprecated but supported)

## 📝 Smart Contract Functions

- `registerUser(string username)`: Register new user
- `isUserRegistered(address)`: Check if user is registered
- `getUserInfo(address)`: Get user details
- `login()`: Emit login event
- `isUsernameAvailable(string)`: Check username availability

## 🎨 UI Components

All components use Tailwind CSS and Lucide React icons for a modern, responsive design.

## 🚨 Important Notes

- Update `CONTRACT_ADDRESS` in `Web3Config.js` after deployment
- Ensure MetaMask is installed for testing
- Test on testnet before mainnet deployment
- Sessions are stored in localStorage and expire after 24 hours
