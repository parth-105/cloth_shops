
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { User, validateUser, addUser, getPendingAdminRequests, approveAdmin, rejectAdmin } from "../lib/data";
// import { useToast } from "@/hooks/use-toast";

// type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   isPendingApproval: boolean;
//   login: (mobile: string, password: string) => Promise<boolean>;
//   register: (name: string, mobile: string, password: string, isAdmin: boolean) => Promise<boolean>;
//   logout: () => void;
//   authLoading: boolean;
//   pendingAdminRequests: User[];
//   fetchPendingAdminRequests: () => void;
//   approveAdminRequest: (userId: string) => Promise<boolean>;
//   rejectAdminRequest: (userId: string) => Promise<boolean>;
//   isHeadAdmin: boolean;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [pendingAdminRequests, setPendingAdminRequests] = useState<User[]>([]);
//   const { toast } = useToast();

//   useEffect(() => {
//     // Check for user in localStorage on initial load
//     const storedUser = localStorage.getItem("ecommerceUser");
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error("Failed to parse stored user", error);
//         localStorage.removeItem("ecommerceUser");
//       }
//     }
//     setAuthLoading(false);
//   }, []);

//   const login = async (mobile: string, password: string): Promise<boolean> => {
//     setAuthLoading(true);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       const validatedUser = validateUser(mobile, password);
      
//       if (validatedUser) {
//         // Check if admin is pending approval
//         if (validatedUser.isPendingApproval) {
//           toast({
//             title: "Admin access pending",
//             description: "Your admin account is pending approval by the head admin.",
//             variant: "destructive",
//           });
//           setAuthLoading(false);
//           return false;
//         }
        
//         setUser(validatedUser);
//         localStorage.setItem("ecommerceUser", JSON.stringify(validatedUser));
//         toast({
//           title: "Login successful",
//           description: `Welcome back, ${validatedUser.name}!`,
//         });
//         return true;
//       } else {
//         toast({
//           title: "Login failed",
//           description: "Invalid mobile number or password",
//           variant: "destructive",
//         });
//         return false;
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast({
//         title: "Login error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//       return false;
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   const register = async (
//     name: string, 
//     mobile: string, 
//     password: string, 
//     isAdmin: boolean = false
//   ): Promise<boolean> => {
//     setAuthLoading(true);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 800));
      
//       // Create the new user
//       const newUser: User = {
//         id: Date.now().toString(),
//         name,
//         mobile,
//         password, // In a real app, this would be hashed
//         isAdmin,
//       };
      
//       // Add the user to our data store
//       addUser(newUser);
      
//       // If it's an admin and not the head admin, don't log them in yet
//       if (isAdmin && mobile !== "1234567890") {
//         toast({
//           title: "Registration pending",
//           description: "Your admin account has been submitted for approval.",
//         });
//         return true;
//       }
      
//       // For customers or the head admin, log them in automatically
//       setUser(newUser);
//       localStorage.setItem("ecommerceUser", JSON.stringify(newUser));
      
//       toast({
//         title: "Registration successful",
//         description: `Welcome, ${name}!`,
//       });
      
//       return true;
//     } catch (error) {
//       console.error("Registration error:", error);
//       toast({
//         title: "Registration error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//       return false;
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("ecommerceUser");
//     toast({
//       title: "Logged out",
//       description: "You have been successfully logged out",
//     });
//   };

//   const fetchPendingAdminRequests = () => {
//     setPendingAdminRequests(getPendingAdminRequests());
//   };

//   const approveAdminRequest = async (userId: string): Promise<boolean> => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     const success = approveAdmin(userId);
//     if (success) {
//       fetchPendingAdminRequests();
//       toast({
//         title: "Admin approved",
//         description: "The admin request has been approved successfully.",
//       });
//     }
//     return success;
//   };

//   const rejectAdminRequest = async (userId: string): Promise<boolean> => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     const success = rejectAdmin(userId);
//     if (success) {
//       fetchPendingAdminRequests();
//       toast({
//         title: "Admin rejected",
//         description: "The admin request has been rejected.",
//       });
//     }
//     return success;
//   };

//   const value = {
//     user,
//     isAuthenticated: !!user && (!user.isAdmin || (user.isAdmin && user.isApproved)),
//     isAdmin: user?.isAdmin || false,
//     isPendingApproval: !!user?.isPendingApproval,
//     login,
//     register,
//     logout,
//     authLoading,
//     pendingAdminRequests,
//     fetchPendingAdminRequests,
//     approveAdminRequest,
//     rejectAdminRequest,
//     isHeadAdmin: !!user && user.mobile === "1234567890" && user.isAdmin,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = 'http://localhost:5000'

type User = {
  id: string;
  name: string;
  mobile: string;
  isAdmin: boolean;
  isPendingApproval?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPendingApproval: boolean;
  login: (mobile: string, password: string) => Promise<boolean>;
  register: (name: string, mobile: string, password: string, isAdmin: boolean) => Promise<boolean>;
  logout: () => void;
  authLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("ecommerceUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("ecommerceUser");
      }
    }
    setAuthLoading(false);
  }, []);

  const login = async (mobile: string, password: string): Promise<boolean> => {
    setAuthLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const userData = await response.json();
      if (userData.isPendingApproval) {
        toast({
          title: "Admin access pending",
          description: "Your admin account is pending approval by the head admin.",
          variant: "destructive",
        });
        setAuthLoading(false);
        return false;
      }

      setUser(userData);
      localStorage.setItem("ecommerceUser", JSON.stringify(userData));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name: string, mobile: string, password: string, isAdmin: boolean): Promise<boolean> => {
    setAuthLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, password, isAdmin }),
      });

      if (!response.ok) throw new Error("Registration failed");

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecommerceUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isPendingApproval: user?.isPendingApproval || false,
    login,
    register,
    logout,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
