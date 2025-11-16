import { useState } from "react";
import {
  Leaf,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Store,
  ShoppingBag,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/**
 * AuthPage Component
 * ---------------------------------------------
 * This component handles both Login and Signup.
 * It also supports role-based authentication
 * (User / Seller).
 * 
 * Backend Dev Notes:
 *  - On form submit, you can attach an onSubmit handler
 *    and send required JSON to your backend API.
 *  - selectedRole helps identify User / Seller flow.
 *  - Add proper form state management or React Hook Form
 *    as needed.
 */

export function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] =
    useState<"user" | "seller">("user");

  return (
    <div className="min-h-screen bg-[#f5f5dc]/30 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* ------------------------------
            LEFT SIDE — BRANDING SECTION
            ------------------------------ */}
        <div className="hidden lg:block relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1753370241639-e8596ccbfe0c?w=800"
            alt="Sustainable living"
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E8B57]/90 to-transparent flex items-end p-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-[#2E8B57]" />
                </div>
                <span className="text-2xl text-white">EcoBazaarX</span>
              </div>

              <h2 className="text-white mb-2">Join the Green Revolution</h2>
              <p className="text-white/90">
                Shop sustainably, live consciously, and make a difference with every purchase.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------------------
            RIGHT SIDE — LOGIN / SIGNUP FORMS
            --------------------------------- */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#2E8B57] rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">EcoBazaarX</span>
          </div>

          <Tabs defaultValue="login" className="w-full">
            {/* Switch between Login / Signup */}
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* =============================
                LOGIN FORM
              ============================= */}
            <TabsContent value="login">
              <div className="space-y-6">
                <div>
                  <h3 className="text-foreground mb-1">Welcome Back!</h3>
                  <p className="text-muted-foreground">Enter your credentials to access your account</p>
                </div>

                {/* -------- Role Selection -------- */}
                <div className="space-y-3">
                  <Label>Login as</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* User Role Button */}
                    <AuthRoleButton
                      role="user"
                      selectedRole={selectedRole}
                      setSelectedRole={setSelectedRole}
                      icon={<ShoppingBag className="w-5 h-5" />}
                    />

                    {/* Seller Role Button */}
                    <AuthRoleButton
                      role="seller"
                      selectedRole={selectedRole}
                      setSelectedRole={setSelectedRole}
                      icon={<Store className="w-5 h-5" />}
                    />
                  </div>
                </div>

                {/* -------- Input Fields -------- */}
                <div className="space-y-4">

                  {/* Email Field */}
                  <InputWithIcon
                    id="login-email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    icon={<Mail />}
                  />

                  {/* Password Field */}
                  <PasswordInput
                    id="login-password"
                    label="Password"
                    placeholder="Enter your password"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                  {/* Remember Me / Forgot */}
                  <div className="flex items-center justify-between text-muted-foreground">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      <span>Remember me</span>
                    </label>

                    <a href="#" className="text-[#2E8B57] hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                    Login as {selectedRole === "user" ? "User" : "Seller"}
                  </Button>

                  {/* Divider */}
                  <Divider text="Or continue with" />

                  {/* OAuth — Only Google Kept */}
                  <div className="grid grid-cols-1">
                    <GoogleButton />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* =============================
                SIGNUP FORM
              ============================= */}
            <TabsContent value="signup">
              <div className="space-y-6">
                <div>
                  <h3 className="text-foreground mb-1">Create Account</h3>
                  <p className="text-muted-foreground">Join our eco-conscious community today</p>
                </div>

                {/* -------- Role Selection -------- */}
                <div className="space-y-3">
                  <Label>I want to join as</Label>
                  <div className="grid grid-cols-2 gap-4">

                    <AuthRoleButton
                      role="user"
                      selectedRole={selectedRole}
                      setSelectedRole={setSelectedRole}
                      icon={<ShoppingBag className="w-5 h-5" />}
                    />

                    <AuthRoleButton
                      role="seller"
                      selectedRole={selectedRole}
                      setSelectedRole={setSelectedRole}
                      icon={<Store className="w-5 h-5" />}
                    />
                  </div>
                </div>

                {/* -------- Input Fields -------- */}
                <div className="space-y-4">

                  {/* Full Name / Business Name */}
                  <InputWithIcon
                    id="signup-name"
                    label={selectedRole === "user" ? "Full Name" : "Business Name"}
                    type="text"
                    placeholder={
                      selectedRole === "user"
                        ? "John Doe"
                        : "Eco Store Inc."
                    }
                    icon={<User />}
                  />

                  {/* Store Description (Only for Sellers) */}
                  {selectedRole === "seller" && (
                    <div>
                      <Label htmlFor="signup-store-desc">Store Description</Label>
                      <Input
                        id="signup-store-desc"
                        placeholder="Brief description of your store"
                        className="rounded-xl mt-1"
                      />
                    </div>
                  )}

                  {/* Email */}
                  <InputWithIcon
                    id="signup-email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    icon={<Mail />}
                  />

                  {/* Password */}
                  <PasswordInput
                    id="signup-password"
                    label="Password"
                    placeholder="Create a password"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                  {/* Terms Agreement */}
                  <label className="flex items-start gap-2 text-muted-foreground cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-border" />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="text-[#2E8B57] hover:underline">Terms of Service</a>
                      {" and "}
                      <a href="#" className="text-[#2E8B57] hover:underline">Privacy Policy</a>.
                    </span>
                  </label>

                  {/* Signup Button */}
                  <Button className="w-full bg-[#2E8B57] hover:bg-[#1F5E3E] text-white rounded-xl">
                    Create {selectedRole === "user" ? "User" : "Seller"} Account
                  </Button>

                  {/* Divider */}
                  <Divider text="Or sign up with" />

                  {/* OAuth — Only Google kept */}
                  <GoogleButton />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------
   REUSABLE COMPONENTS
--------------------------------------------------------- */

// Reusable Role Button
function AuthRoleButton({ role, selectedRole, setSelectedRole, icon }) {
  const active = selectedRole === role;

  return (
    <button
      type="button"
      onClick={() => setSelectedRole(role)}
      className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${
        active
          ? "border-[#2E8B57] bg-[#2E8B57]/10 text-[#2E8B57]"
          : "border-border hover:border-[#2E8B57]/50"
      }`}
    >
      {icon} <span>{role === "user" ? "User" : "Seller"}</span>
    </button>
  );
}

// Reusable Input With Icon
function InputWithIcon({ id, label, type, placeholder, icon }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="pl-10 rounded-xl"
        />
      </div>
    </div>
  );
}

// Password Input Component
function PasswordInput({
  id,
  label,
  placeholder,
  showPassword,
  setShowPassword,
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pl-10 pr-10 rounded-xl"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
}

// Divider UI
function Divider({ text }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 bg-white text-muted-foreground text-sm">
          {text}
        </span>
      </div>
    </div>
  );
}

// Google OAuth Button (Facebook Removed)
function GoogleButton() {
  return (
    <Button variant="outline" className="rounded-xl flex items-center justify-center">
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </Button>
  );
}
