import { useAuth } from "../Context/AuthContext";

const PermissionWrapper = ({ permission, children }) => {
  const { user } = useAuth();
  if (!user?.permissions?.includes(permission)) return null;
  return <>{children}</>;
};

export default PermissionWrapper;
