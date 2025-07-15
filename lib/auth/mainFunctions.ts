import { initialSnippetState } from "@/app/(app)/dashboard/snippets/new/page";
import { State } from "@/app/(auth)/signup/page";

export async function signUpUser(state: State, setState: any, router) {
   const {step, loading, error, ...formData} = state;
   try {
      setState(prev => {
         return {...prev, loading: true}
      });

      const req = await fetch('http://127.0.0.1:5000/auth/signup', {
         headers: {
            'content-type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify(formData)
      });



      const res = await req.json();
      
      if(!res.success) throw new Error(res.message);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 40);

      document.cookie = `session=${res.token}; path=/; Secure; SameSite=Strict; Expires=${expirationDate.toUTCString()};`;

      router.replace('/dashboard')
   } catch (error: {message: string}) {
      setState(prev => {
         return {...prev, error: error.message}
      })
   } finally {
      setState(prev => {
         return {...prev, loading: false}
      })
   }
}

export async function signInUser(state: State, setState: any, router) {
   const {step, loading, error, ...formData} = state;
   try {
      setState(prev => {
         return {...prev, loading: true}
      });

      const req = await fetch('http://127.0.0.1:5000/auth/signup', {
         headers: {
            'content-type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify(formData)
      });



      const res = await req.json();
      
      if(!res.success) throw new Error(res.message);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 40);

      document.cookie = `session=${res.token}; path=/; Secure; SameSite=Strict; Expires=${expirationDate.toUTCString()};`;

         router.replace('/dashboard')
   } catch (error: {message: string}) {
      setState(prev => {
         return {...prev, error: error.message}
      })
   } finally {
      setState(prev => {
         return {...prev, loading: false}
      })
   }
}
 

export async function newSnippetSubmit(state, setState, router) {
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

    setState(initialSnippetState);
    router.replace("/dashboard/snippets"); 

  } catch (error: any) {
    setState((prev) => ({
      ...prev,
      error: error.message || "مشکلی در ثبت پیش آمد",
    }));
  }
}