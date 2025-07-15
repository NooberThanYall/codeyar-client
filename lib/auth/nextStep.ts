import { State } from "@/app/(auth)/signup/page";
import { signUpUser } from "./mainFunctions";

export function handleNext(state: State, setState, router) {
  if (state.step === 1) {
    if (!state.fullName.trim() || !state.email.includes("@")) {
      setState((prev) => {
        return { ...prev, error: "نام و ایمیل نامعتبر" };
      });

      return;
    }
  }
  if (state.step === 2) {
    if (state.password.length < 8) {
      setState((prev) => {
        return { ...prev, password: "", error: "پسورد قویتر انتخاب کنید" };
      });
      return;
    }
  }
  if (state.step === 3) {
    const langsRaw = state.languages[0]; // چون الان فقط یه مقدار توشه
    const validLangs = langsRaw
      .split("-") // فرض کردی با - جدا می‌کنه
      .map((l) => l.trim())
      .filter((l) => l !== "");

    if (validLangs.length === 0) {
      setState((prev) => {
        return { ...prev, password: "", error: "زبان های خود را بنویسید" };
      });
      return;
    }


    // The Actual signup function
    signUpUser(state, setState, router);
    
  }
  setState((prev) => {
    if(prev.step == 3) return;
    return { ...prev, step: prev.step + 1 };
  });
}
