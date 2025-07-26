import LoginScreen from "@/components/screens/login/login";
import PublicRoute from "@/components/guards/publicRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginScreen />
    </PublicRoute>
  );
}
