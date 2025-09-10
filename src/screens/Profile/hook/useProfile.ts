import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import { ProfileScreenProps } from "../type/type";

export const useProfile = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<ProfileScreenProps["navigation"]>();

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "doctor":
        return "Médico";
      case "patient":
        return "Paciente";
      default:
        return role;
    }
  };
  return {
    user,
    signOut,
    navigation,
    getRoleText,
  };
};
