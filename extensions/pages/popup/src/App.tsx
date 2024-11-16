import { useEffect, useState } from "react";
import { useSession } from "./contexts/SessionContext";

import Login from "./LoginScreen";
import Popup from "./Popup";

const App = () => {
  const { loginType } = useSession();
  const [continueRequest, setContinueRequest] = useState(false);
  const [showLogin, setShowLogin] = useState(!loginType);

  useEffect(() => {
    if (loginType) {
      setContinueRequest(true);
    }
  }, [loginType])
  
  return (
    <div>
      <div className="min-h-screen w-full bg-gray-900 text-white">
        <Login show={showLogin} />
        { loginType && <Popup continueRequest={continueRequest} setShowLogin={setShowLogin} /> }
      </div>
    </div>
  )
};

export default App;
