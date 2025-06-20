import { useAuth } from "../Context/AuthContext";

const RoleWrapper = ({ role, children }) => {
  const { user } = useAuth();
  if (user?.role !== role) return null;
  return <>{children}</>;
};

export default RoleWrapper;
