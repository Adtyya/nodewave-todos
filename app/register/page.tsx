import RegisterScreen from "@/components/screens/register/register";
import PublicRoute from "@/components/guards/publicRoute";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <RegisterScreen />
    </PublicRoute>
  );
}
