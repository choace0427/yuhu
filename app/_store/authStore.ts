import { supabase } from "@/supabase";
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
      signIn: async (email: string, password: string, router: any) => {
        try {
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

          const { data: customerData, error: customerError } = await supabase
            .from("customers_list")
            .select("*")
            .eq("id", data?.user?.id)
            .single();

          if (customerError || !customerData) {
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

            set({ userInfo: therapistData, isAuthenticated: true });
            router.push("/therapist");
          } else {
            set({ userInfo: customerData, isAuthenticated: true });
            router.push("/customer");
          }

          toast.success("You have successfully logged in!");
        } catch (error) {
          console.error("Sign in error:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      },
      signUp: async (name, email, password, router) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: name },
              //   emailRedirectTo: baseUrl,
            },
          });
          if (error) {
            toast.error("Sign-up failed. Please try again!");
            return;
          }

          if (data) {
            router.push("/role");
          }
        } catch (err) {
          console.error("Unexpected error during login:", err);
        } finally {
          console.error("Unexpected error during login:");
        }
      },
      signOut: async (router) => {
        try {
          localStorage.removeItem("userInfo");
          set({ userInfo: null, isAuthenticated: false });
          await supabase.auth.signOut();
          set({
            isAuthenticated: false,
            userInfo: null,
          });
          router.push("/");
        } catch (err) {
          console.error("Error during sign-out:", err);
        }
      },
      handlegoogleSignin: async (router: any) => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `http://localhost:3000/auth/callback`,
          },
        });

        if (error) {
          toast.error("Google login failed. Please try again.");
          return;
        }

        // toast.success("Redirecting to Google login...");

        // After Supabase redirects back to the API route, fetch the response
        // const response = await fetch("/api/google-signin");
        // const result = await response.json();

        // if (response.ok) {
        //   router.push(result.redirectUrl);
        //   toast.success(result.message);
        // } else {
        //   toast.error(result.error);
        // }
      },
      setIsAuth: (isAuth) => set({ isAuthenticated: isAuth }),
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),
      checkAuthState: async () => {
        const { data } = await supabase.auth.getSession();

        if (data?.session) {
          const user = data.session.user;

          if (user) {
            const userId = user.id;

            const { data: customerData } = await supabase
              .from("customers_list")
              .select("*")
              .eq("id", userId)
              .single();

            if (customerData) {
              set({ userInfo: customerData, isAuthenticated: true });
            } else {
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
