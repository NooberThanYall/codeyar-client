import { initialSnippetState } from "@/app/(app)/dashboard/snippets/new/page";
import { State } from "@/app/(auth)/signup/page";

export async function signUpUser(state: State, setState: any, router) {
  const { step, loading, error, ...formData } = state;
  try {
    setState((prev) => {
      return { ...prev, loading: true };
    });

    const req = await fetch("http://127.0.0.1:5000/auth/signup", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) throw new Error(res.message);

    router.replace("/dashboard");
  } catch (error: { message: string }) {
    setState((prev) => {
      return { ...prev, error: error.message };
    });
  } finally {
    setState((prev) => {
      return { ...prev, loading: false };
    });
  }
}

export async function signInUser(state: State, setState: any, router) {
  const { step, loading, error, ...formData } = state;
  try {
    setState((prev) => {
      return { ...prev, loading: true };
    });

    const req = await fetch("http://127.0.0.1:5000/auth/login", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const res = await req.json();

    if (!res.success) throw new Error(res.message);

    router.replace("/dashboard");
  } catch (error: { message: string }) {
    setState((prev) => {
      return { ...prev, error: error.message };
    });
  } finally {
    setState((prev) => {
      return { ...prev, loading: false };
    });
  }
}

export async function newSnippetSubmit(state, setState, router, setSnippets) {
  // اعتبارسنجی فیلدها
  if (!state.title || !state.description || !state.code || !state.language) {
    setState((prev) => ({
      ...prev,
      error: "لطفاً تمام فیلدها را پر کنید",
    }));
    return;
  }

  try {
    // پاک کردن خطای قبلی
    setState((prev) => ({ ...prev, error: "" }));

    // ارسال درخواست به API
    const response = await fetch("http://127.0.0.1:5000/snippet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: state.title,
        description: state.description,
        code: state.code,
        language: state.language,
      }),
    });

    if (!response.ok) {
      throw new Error("خطا در ثبت قطعه کد");
    }

    const resData = await response.json();

    setState(initialSnippetState);
    setSnippets((prev) => [...prev, resData.snippet]);
    router.replace("/dashboard/snippets");
  } catch (error: any) {
    setState((prev) => ({
      ...prev,
      error: error.message || "مشکلی در ثبت پیش آمد",
    }));
  }
}
export async function editSnippetSubmit(
  //@ts-expect-error kos nant
  state,
  //@ts-expect-error kos nant 2
  setState,
  //@ts-expect-error kos nant 3
  router,
  //@ts-expect-error kos nant 4
  setSnippets,
  //@ts-expect-error kos nant 5
  snippetId
) {
  // اعتبارسنجی فیلدها
  if (!state.title || !state.description || !state.code || !state.language) {
    setState((prev) => ({
      ...prev,
      error: "لطفاً تمام فیلدها را پر کنید",
    }));
    return;
  }

  try {
    // پاک کردن خطای قبلی
    setState((prev) => ({ ...prev, error: "" }));

    // ارسال درخواست به API
    const response = await fetch("http://127.0.0.1:5000/snippet", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        snippetId,
        title: state.title,
        description: state.description,
        code: state.code,
        language: state.language,
      }),
    });

    if (!response.ok) {
      throw new Error("خطا در ویرایش قطعه کد");
    }

    const resData = await response.json();

    setState(initialSnippetState);
    setSnippets((prevs) => {
      return prevs.map((snip) => {
        return snip._id == resData.updated._id ? resData.updated : snip;
      });
    });
    router.replace("/dashboard/snippets");
  } catch (error: any) {
    setState((prev) => ({
      ...prev,
      error: error.message || "مشکلی در ویرایش پیش آمد",
    }));
  }
}

export const handleAIRequest = async (
  setLoading: any,
  snippet: any,
  setOptimizedCode: any,
  setAIPopup: any
) => {
  setLoading(true);
  const res = await fetch("http://127.0.0.1:5000/snippet/ai-optimize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ inputCode: snippet.code }),
  });
  const data = await res.json();
  setOptimizedCode(data.optimizedCode);
  setAIPopup(true);
  setLoading(false);
};

export const handleAcceptSuggestion = async (
  snippet: any,
  optimizedCode: string,
  onClose: () => void,
  setAIPopup: any
) => {
  await fetch("http://127.0.0.1:5000/snippet", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      snippetId: snippet._id,
      code: optimizedCode
    }),
  });
  setAIPopup(false);
  onClose();
};
