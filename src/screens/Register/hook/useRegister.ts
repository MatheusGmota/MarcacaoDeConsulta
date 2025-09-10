import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { RegisterScreenProps } from "../type/type";

export const useRegister = () => {
  const { register } = useAuth();
  const navigation = useNavigation<RegisterScreenProps["navigation"]>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      if (!name || !email || !password) {
        setError("Por favor, preencha todos os campos");
        return;
      }

      await register({
        name,
        email,
        password,
      });

      // Após o registro bem-sucedido, navega para o login
      navigation.navigate("Login");
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    navigation,
    loading,
    error,
    handleRegister,
  };
};
