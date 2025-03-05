// import { createClient } from "@/app/utils/supabase/client";
// import { supabase } from "@/supabase";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// interface AuthState {
//   session: any | null;
//   isAuthenticated: boolean;
//   userInfo: any;
//   user: any | null;
//   signIn: (email: string, password: string, router: any) => void;
//   signOut: (router: any) => Promise<void>;
//   setIsAuth: (isAuth: boolean) => void;
//   setUserInfo: (userInfo: any) => void;
//   signUp: (name: string, email: string, password: string, router: any) => void;
//   checkAuthState: () => Promise<void>;
//   handlegoogleSignin: (router: any) => Promise<void>;
// }

// export const useAuthStore = create(
//   persist<AuthState>(
//     (set) => ({
//       session: null,
//       user: null,
//       isAuthenticated: false,
//       userInfo: null,
//       signIn: async (email: string, password: string, router: any) => {
//         const supabase = createClient();
//         const savedLanguage = localStorage.getItem("language_id") || "en";

//         try {
//           const { data, error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//           });

//           if (error) {
//             toast.error(
//               error.message === "Invalid login credentials"
//                 ? "Invalid email or password. Please try again."
//                 : "An error occurred during login. Please try again."
//             );
//             return;
//           }

//           const { data: customerData, error: customerError } = await supabase
//             .from("customers_list")
//             .select("*")
//             .eq("id", data?.user?.id)
//             .single();

//           if (customerError || !customerData) {
//             const { data: therapistData, error: therapistError } =
//               await supabase
//                 .from("therapist_list")
//                 .select("*")
//                 .eq("id", data?.user?.id)
//                 .single();

//             if (therapistError || !therapistData) {
//               toast.error(
//                 "Unable to retrieve user role information. Please try again."
//               );
//               return;
//             }

//             if (therapistData.step === "general") {
//               set({ userInfo: therapistData, isAuthenticated: true });
//               router.replace(`${savedLanguage}/therapist/signup/general`);
//             }

//             if (therapistData.step === "services") {
//               set({ userInfo: therapistData, isAuthenticated: true });
//               router.replace(`${savedLanguage}/therapist/signup/services`);
//             }

//             if (therapistData.step === "payment") {
//               set({ userInfo: therapistData, isAuthenticated: true });
//               router.replace(`${savedLanguage}/therapist/signup/payment`);
//             }
//             if (therapistData.step === "verify") {
//               set({ userInfo: therapistData, isAuthenticated: true });
//               router.replace(`${savedLanguage}/therapist/signup/verify`);
//             }

//             if (therapistData.step === "completed") {
//               set({ userInfo: therapistData, isAuthenticated: true });
//               router.replace(`${savedLanguage}/therapist`);
//             }
//           } else {
//             set({ userInfo: customerData, isAuthenticated: true });
//             router.replace(`${savedLanguage}/customer`);
//           }

//           toast.success("You have successfully logged in!");
//         } catch (error) {
//           console.error("Sign in error:", error);
//           toast.error("An unexpected error occurred. Please try again.");
//         }
//       },
//       signUp: async (name, email, password, router) => {
//         const supabase = createClient();
//         const savedLanguage = localStorage.getItem("language_id") || "en";

//         try {
//           const { data, error } = await supabase.auth.signUp({
//             email,
//             password,
//             options: {
//               data: { full_name: name },
//               //   emailRedirectTo: baseUrl,
//             },
//           });
//           if (error) {
//             toast.error("Sign-up failed. Please try again!");
//             return;
//           }

//           if (data) {
//             router.replace(`${savedLanguage}/role`);
//           }
//         } catch (err) {
//           console.error("Unexpected error during login:", err);
//         } finally {
//           console.error("Unexpected error during login:");
//         }
//       },
//       signOut: async (router) => {
//         const supabase = createClient();
//         const savedLanguage = localStorage.getItem("language_id") || "en";

//         try {
//           localStorage.removeItem("userInfo");
//           set({ userInfo: null, isAuthenticated: false });
//           await supabase.auth.signOut();
//           set({
//             isAuthenticated: false,
//             userInfo: null,
//           });
//           router.replace(`${savedLanguage}/auth/login`);
//         } catch (err) {
//           console.error("Error during sign-out:", err);
//         }
//       },
//       handlegoogleSignin: async (router: any) => {
//         const supabase = createClient();
//         const savedLanguage = localStorage.getItem("language_id") || "en";

//         const { error } = await supabase.auth.signInWithOAuth({
//           provider: "google",
//           options: {
//             redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/${savedLanguage}/auth/callback`,
//           },
//         });

//         if (error) {
//           toast.error("Google login failed. Please try again.");
//           return;
//         }

//         // toast.success("Redirecting to Google login...");

//         // After Supabase redirects back to the API route, fetch the response
//         // const response = await fetch("/api/google-signin");
//         // const result = await response.json();

//         // if (response.ok) {
//         //   router.replace(result.redirectUrl);
//         //   toast.success(result.message);
//         // } else {
//         //   toast.error(result.error);
//         // }
//       },
//       setIsAuth: (isAuth) => set({ isAuthenticated: isAuth }),
//       setUserInfo: (userInfo) => set({ userInfo: userInfo }),
//       checkAuthState: async () => {
//         const supabase = createClient();
//         const { data } = await supabase.auth.getSession();

//         if (data?.session) {
//           const user = data.session.user;

//           if (user) {
//             const userId = user.id;

//             const { data: customerData } = await supabase
//               .from("customers_list")
//               .select("*")
//               .eq("id", userId)
//               .single();

//             if (customerData) {
//               set({ userInfo: customerData, isAuthenticated: true });
//             } else {
//               const { data: therapistData } = await supabase
//                 .from("therapist_list")
//                 .select("*")
//                 .eq("id", userId)
//                 .single();

//               if (therapistData) {
//                 set({ userInfo: therapistData, isAuthenticated: true });
//               }
//             }

//             set({
//               session: data.session,
//               user,
//               isAuthenticated: true,
//             });
//           }
//         } else {
//           set({
//             session: null,
//             user: null,
//             isAuthenticated: false,
//             userInfo: null,
//           });
//         }
//       },
//     }),
//     {
//       name: "userInfo",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  session: any | null;
  isAuthenticated: boolean;
  userInfo: any;
  user: any | null;
  signIn: (email: string, password: string, router: any) => void;
  signOut: (router: any) => Promise<void>;
  setIsAuth: (isAuth: boolean) => void;
  setUserInfo: (userInfo: any) => void;
  signUp: (name: string, email: string, password: string, router: any) => void;
  checkAuthState: () => Promise<void>;
  handlegoogleSignin: (router: any) => Promise<void>;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      user: null,
      isAuthenticated: false,
      userInfo: null,

      // Sign In Function
      signIn: async (email: string, password: string, router: any) => {
        const supabase = createClient();

        try {
          const savedLanguage =
            typeof window !== "undefined"
              ? localStorage.getItem("language_id") || "en"
              : "en";

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            toast.error(
              error.message === "Invalid login credentials"
                ? "Invalid email or password. Please try again."
                : "An error occurred during login. Please try again."
            );
            return;
          }

          // Check if the user is a customer
          const { data: customerData, error: customerError } = await supabase
            .from("customers_list")
            .select("*")
            .eq("id", data?.user?.id)
            .single();

          if (customerError || !customerData) {
            // Check if the user is a therapist if they are not a customer
            const { data: therapistData, error: therapistError } =
              await supabase
                .from("therapist_list")
                .select("*")
                .eq("id", data?.user?.id)
                .single();

            if (therapistError || !therapistData) {
              toast.error(
                "Unable to retrieve user role information. Please try again."
              );
              return;
            }

            // Redirect therapist based on their `step`
            set({ userInfo: therapistData, isAuthenticated: true });
            const therapistSteps = <any>{
              general: `${savedLanguage}/therapist/signup/general`,
              services: `${savedLanguage}/therapist/signup/services`,
              payment: `${savedLanguage}/therapist/signup/payment`,
              verify: `${savedLanguage}/therapist/signup/verify`,
              completed: `${savedLanguage}/therapist`,
            };
            const redirectUrl = therapistSteps[therapistData.step] || "/";
            router.replace(`/${redirectUrl}`);
          } else {
            // Customer found
            set({ userInfo: customerData, isAuthenticated: true });
            router.replace(`/${savedLanguage}/services`);
          }

          toast.success("You have successfully logged in!");
        } catch (error) {
          console.error("Sign in error:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      },

      // Sign Up Function
      signUp: async (name, email, password, router) => {
        const supabase = createClient();

        try {
          const savedLanguage =
            typeof window !== "undefined"
              ? localStorage.getItem("language_id") || "en"
              : "en";

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: name },
            },
          });

          if (error) {
            toast.error("Sign-up failed. Please try again!");
            return;
          }

          if (data) {
            router.replace(`/${savedLanguage}/role`);
          }
        } catch (err) {
          console.error("Unexpected error during sign-up:", err);
          toast.error("Sign-up failed. Please try again.");
        }
      },

      // Sign Out Function
      signOut: async (router) => {
        const supabase = createClient();

        try {
          const savedLanguage =
            typeof window !== "undefined"
              ? localStorage.getItem("language_id") || "en"
              : "en";

          localStorage.removeItem("userInfo"); // Remove user info from localStorage
          set({ userInfo: null, isAuthenticated: false }); // Reset auth state

          await supabase.auth.signOut(); // Sign out from Supabase

          router.replace(`/${savedLanguage}/auth/login`); // Redirect to login
        } catch (err) {
          console.error("Error during sign-out:", err);
          toast.error("An error occurred during sign-out. Please try again.");
        }
      },

      // Google Sign In Function
      handlegoogleSignin: async (router: any) => {
        const supabase = createClient();

        try {
          const savedLanguage =
            typeof window !== "undefined"
              ? localStorage.getItem("language_id") || "en"
              : "en";

          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/${savedLanguage}/auth/callback`,
            },
          });

          if (error) {
            toast.error("Google login failed. Please try again.");
          }
        } catch (err) {
          console.error("Google sign-in error:", err);
          toast.error(
            "An error occurred during Google sign-in. Please try again."
          );
        }
      },

      // Set Authentication Status
      setIsAuth: (isAuth) => set({ isAuthenticated: isAuth }),

      // Set User Information
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),

      // Check Authentication State
      checkAuthState: async () => {
        const supabase = createClient();

        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          const user = data.session.user;

          if (user) {
            const userId = user.id;

            // Check if the user is a customer
            const { data: customerData } = await supabase
              .from("customers_list")
              .select("*")
              .eq("id", userId)
              .single();

            if (customerData) {
              set({ userInfo: customerData, isAuthenticated: true });
            } else {
              // Check if the user is a therapist
              const { data: therapistData } = await supabase
                .from("therapist_list")
                .select("*")
                .eq("id", userId)
                .single();

              if (therapistData) {
                set({ userInfo: therapistData, isAuthenticated: true });
              }
            }

            set({
              session: data.session,
              user,
              isAuthenticated: true,
            });
          }
        } else {
          set({
            session: null,
            user: null,
            isAuthenticated: false,
            userInfo: null,
          });
        }
      },
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
