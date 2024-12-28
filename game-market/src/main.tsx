import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "@/app/page/home.tsx";
import Section from "@/app/page/section";
import Product from "@/app/page/product";
import ProfileUpdating from "@/app/page/user/profile-updating";
import CartPage from "@/app/page/user/cart";
import CheckoutPage from "@/app/page/user/checkout";
import OrderConfirmPage from "@/app/page/user/order-confirm";
import Dashboard from "@/app/page/admin/dashboard";
import GameManagement from "@/app/page/admin/game-management";
import UserManagement from "@/app/page/admin/user-management";
import BecomeSeller from "@/app/page/admin/become-seller";
import OrderList from "@/app/page/admin/order-list";
import UserRequest from "@/app/page/admin/user-request";
import ProductUploading from "@/app/page/provider/product-uploading";
import ProductDetail from "@/app/page/product-detail";
import SignIn from "@/app/page/auth/sign-in";
import SignUp from "@/app/page/auth/sign-up";
import ProtectedRoute from "@/components/protectedRoute";
import PasswordChange from "@/app/page/user/password-change";

import { jwtDecode } from "jwt-decode"; // Import hàm jwtDecode từ thư
// từ thư viện jwt-decode. Hàm này dùng để giải mã token JWT,
// giúp lấy thông tin người dùng từ token.
// Token JWT là gì?

// Khởi tạo đối tượng data chứa thông tin người dùng mặc định.
let data = {
  user: {
    id: "",
    name: "Test",
    email: "Test",
    avatar:
      "https://i.pinimg.com/736x/4e/ff/15/4eff156ff63f26f40a4280445631172d.jpg",
  },
  userType: "guest",
};

// Kiểm tra xem có token JWT trong localStorage hay không
// (do client lưu JWWT, thường trong localStorage hoặc HTTP-only cookie)
// và cập nhật thông tin người dùng nếu có.
const token = localStorage.getItem("token");
// localStorage là một trong các Web Storage API cung cấp bởi browser,
// cho phép lưu trữ dữ liệu dưới dạng key-value.
// Ở đây, "token" là key, giá trị của token JWT là value.

// Nếu có token
if (token) {
  console.log("Token found");
  // Giải mã token lấy id, username và role của người dùng
  const decoded = jwtDecode<{ id: string; username: string; role: string }>(
    token
  );
  // Cập nhật data với thông tin người dùng
  data.user.id = decoded.id;
  data.user.name = decoded.username;
  data.userType = decoded.role;
} else {
  // Nếu không có token
  console.log("No token found");
}

createRoot(document.querySelector(".root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <SidebarProvider>
              <AppSidebar user={data.user} userType={data.userType} />
              <SidebarInset className="flex flex-col h-4 overflow-hidden">
                <Header
                  user={data.user}
                  userType={data.userType}
                  className="sticky top-0 z-10 bg-background"
                />
                <main className="flex-grow overflow-y-auto min-w-screen">
                  <div className="mx-auto px-4">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Navigate to="/" />} />
                      <Route path="/user/game" element={<Section />} />
                      <Route
                        path="/user/account"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/purchase"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/notification"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/setting"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route path="/user/game/all" element={<Product />} />
                      <Route
                        path="/user/game/:productId"
                        element={<ProductDetail />}
                      />
                      <Route path="/user/game/category" element={<Section />} />
                      <Route
                        path="/user/game/favorite"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/account/payment"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/account/profile"
                        element={
                          <ProtectedRoute
                            component={ProfileUpdating}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/account/address"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/account/password"
                        element={
                          <ProtectedRoute
                            component={PasswordChange}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/purchase/order"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/purchase/history"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/notification/order"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/notification/promotion"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/setting/general"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/setting/notification"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/setting/privacy"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["user", "admin", "provider"]}
                          />
                        }
                      />
                      <Route
                        path="/user/cart"
                        element={
                          <ProtectedRoute
                            component={CartPage}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/checkout"
                        element={
                          <ProtectedRoute
                            component={CheckoutPage}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/user/order-confirm"
                        element={
                          <ProtectedRoute
                            component={OrderConfirmPage}
                            roles={["user"]}
                          />
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/admin/dashboard"
                        element={
                          <ProtectedRoute
                            component={Dashboard}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/admin/game-management"
                        element={
                          <ProtectedRoute
                            component={GameManagement}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/admin/user-management"
                        element={
                          <ProtectedRoute
                            component={UserManagement}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/admin/become-seller"
                        element={
                          <ProtectedRoute
                            component={BecomeSeller}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/admin/order-management"
                        element={
                          <ProtectedRoute
                            component={OrderList}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/admin/report-management"
                        element={
                          <ProtectedRoute
                            component={UserRequest}
                            roles={["admin"]}
                          />
                        }
                      />
                      <Route
                        path="/provider"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/dashboard"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/game"
                        element={
                          <ProtectedRoute
                            component={ProductUploading}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/order"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/customer"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/finance"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/promotion"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route
                        path="/provider/report"
                        element={
                          <ProtectedRoute
                            component={Section}
                            roles={["provider"]}
                          />
                        }
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    <Footer className="bg-background z-10" />
                  </div>
                </main>
              </SidebarInset>
            </SidebarProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
