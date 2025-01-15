import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userInfo: any;
  signIn: (email: string, password: string, router: any) => void;
  signOut: (router: any) => Promise<void>;
  setIsAuth: (isAuth: boolean) => void;
  setUserInfo: (userInfo: any) => void;
  signUp: (name: string, email: string, password: string, router: any) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      user: null,
      isAuthenticated: false,
      userInfo: null,
      signIn: async (email, password, router) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            if (error.message === "Invalid login credentials") {
              toast.error("Invalid email or password. Please try again.");
            } else {
              toast.error("An error occurred during login. Please try again.");
            }
            return;
          }

          const userId = data?.user?.id;

          if (!userId) {
            toast.error(
              "Unable to retrieve user information. Please try again."
            );
            return;
          }

          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

          if (userError || !userData) {
            toast.info("Please complete your profile.");
            router.push("/role");
            return;
          }

          set({ userInfo: userData, isAuthenticated: true });

          const userRole = userData.role;

          if (userRole === "customer") {
            router.push("/customer");
          } else if (userRole === "therapist") {
            router.push("/therapist");
          } else {
            router.push("/role");
          }
          toast.success("You have successfully logged in!");
        } catch (err) {
          console.error("Unexpected error during login:", err);
        } finally {
          console.error("Unexpected error during login:");
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

          const userId = data?.user?.id;

          if (userId) {
            const { error: userError } = await supabase
              .from("users")
              .select("*")
              .eq("id", userId)
              .single();

            if (userError) {
              const { error: insertError } = await supabase
                .from("users")
                .insert({ id: userId, email: data?.user?.email });

              if (insertError) {
                toast.error("Error saving user data. Please contact support!");
                return;
              }
            }
            toast.success("Sign-up successful!");

            setTimeout(() => {
              router.push("/auth/login");
            }, 1000);
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
          router.push("/");
        } catch (err) {
          console.error("Error during sign-out:", err);
        }
      },
      setIsAuth: (isAuth) => set({ isAuthenticated: isAuth }),
      setUserInfo: (userInfo) => set({ userInfo: userInfo }),
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
