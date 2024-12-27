import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Package, DollarSign, Clock } from 'lucide-react';
import { StatCard } from "@/components/ui/stat-card";
import { SalesChart } from "@/components/sales-chart";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get<{ totalUsers: number }>('http://localhost:6969/api/users/total');
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Failed to fetch total users:', error);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get<{ recordset: { numbProducts: number }[] }>('http://localhost:6969/api/products/total');
        const totalProducts = response.data.recordset[0].numbProducts;
        setTotalProducts(totalProducts);
        console.log(totalProducts)
      } catch (error) {
        console.error('Failed to fetch total products:', error);
      }
    };

    const fetchTotalSales = async () => {
      try {
        const response = await axios.get<{ recordset: { totalSale: number }[] }>('http://localhost:6969/api/sales');
        const totalSales = response.data.recordset[0].totalSale;
        setTotalSales(totalSales);
      } catch (error) {
        console.error('Failed to fetch total sales:', error);
      }
    };

    const fetchTotalPending = async () => {
      try {
        const response = await axios.get('http://localhost:6969/api/orders/pending');
        const totalPending = (response.data as { recordset: { numbUsers: number }[] }).recordset[0].numbUsers;
        setTotalPending(totalPending);
      } catch (error) {
        console.error('Failed to fetch total pending orders:', error);
      }
    };

    fetchTotalUsers();
    fetchTotalProducts();
    fetchTotalSales();
    fetchTotalPending();
  }, []);

  return (
    <div className="w-full">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid w-full">
            <div className="w-full">
              <div className="h-full px-4 py-6 lg:px-8">
                <h1 className="text-xl font-bold mb-8 mt-2 mx-2">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total User"
                    value={totalUsers.toLocaleString()}
                    icon={Users}
                    change={{
                      value: "8.5%",
                      trend: "up",
                      text: "Up from yesterday"
                    }}
                  />
                  <StatCard
                    title="Total Order"
                    value={totalProducts.toLocaleString()}
                    icon={Package}
                    change={{
                      value: "1.3%",
                      trend: "up",
                      text: "Up from past week"
                    }}
                  />
                  <StatCard
                    title="Total Sales"
                    value={`$${totalSales.toLocaleString()}`}
                    icon={DollarSign}
                    change={{
                      value: "4.3%",
                      trend: "down",
                      text: "Down from yesterday"
                    }}
                  />
                  <StatCard
                    title="Total Pending"
                    value={totalPending.toLocaleString()}
                    icon={Clock}
                    change={{
                      value: "1.8%",
                      trend: "up",
                      text: "Up from yesterday"
                    }}
                  />
                </div>
                <div className="mt-6">
                  <SalesChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}