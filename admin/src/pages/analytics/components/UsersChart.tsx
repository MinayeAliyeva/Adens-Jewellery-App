import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SpinComponent } from "../../../utils/components/SpinComponent";
import { useGetUsersQuery } from "../../../store/api/users/users-api";
import { IUser } from "../../../store/api/admin/admin-api";


interface DataType {
  [key: string]: number ;
}
const prepareUserData = (users?: IUser[]) => {
    const userCountByMinute: DataType = {};
  
    users?.forEach((user) => {
      const dateMinute = new Date(user?.createdAt!).toISOString().slice(0, 16);
      userCountByMinute[dateMinute] = (userCountByMinute[dateMinute] || 0) + 1  ;
    });
  
    return Object.keys(userCountByMinute).map((dateMinute) => ({
      date: dateMinute,
      users: userCountByMinute[dateMinute],
    }));
  };
const UsersChart = () => {
  const { data, isLoading } = useGetUsersQuery();

  const userData = prepareUserData(data!);

  return (
    <SpinComponent loading={isLoading}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={userData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            interval="preserveStartEnd"
           
            label={{ value: "Tarix", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={[0, "auto"]}
            ticks={[0, 10, 20, 30, 40, 50]}
            label={{
              value: "İstifadəçi sayı",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />
          <Legend />

          <Bar yAxisId="left" dataKey="users" fill="#ff7300" name="İstifadəçi sayı" />
        </BarChart>
      </ResponsiveContainer>
    </SpinComponent>
  );
};

export default memo(UsersChart);
