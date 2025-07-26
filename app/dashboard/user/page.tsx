import TodoScreen from "@/components/screens/dashboard/user/todo";
import PrivateRoute from "@/components/guards/privateRoute";

export default function DashboardUser() {
  return (
    <PrivateRoute>
      <TodoScreen />
    </PrivateRoute>
  );
}
