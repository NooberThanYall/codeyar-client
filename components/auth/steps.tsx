import InputLabel from '@/components/auth/InputLabel'
import { State } from '@/app/(auth)/signup/page'
import React from 'react'


// Name Email
export const NE = ({state, handleChangeInput}) => {  
  return (
     <>
     <InputLabel
     
            value={state.fullName}
            id={"fullName"}
            setValue={handleChangeInput}
            label={"نام و نام خانوادگی"}
            type={"text"}
            placeholder={"نام کامل خود را وارد کنید"}
            />
          <InputLabel
          
            value={state.email}
            id={"email"}
            setValue={handleChangeInput}
            label={"ایمیل"}
            type={"email"}
            placeholder={"ایمیل خود را وارد کنید"}
            />
            </>
  )
}


export const P = ({state, handleChangeInput}) => {  
  return (
     <>
          <InputLabel
          
            value={state.password}
            id={"password"}
            setValue={handleChangeInput}
            label={"رمز عبور"}
            type={"password"}
            placeholder={"پسورد مورد نظر خود را وارد کنید"}
            />
            </>
  )
}

export const Langs = ({state, setState}: {state: State, setState: any}) => {  
  return (
     <>
          <InputLabel
          
            value={state.languages.join("-").toLowerCase()}
            id={"langs"}
            setValue={(e: React.ChangeEvent<HTMLInputElement>) => {
              setState(prev => {
                return {...prev, languages: (e.target.value).split('-')}})
            }}
            label={"زبان های برنامه نویسی"}
            type={"text"}
            placeholder={"زبان های برنامه نویسی خود را وارد کنید "}
            />
            </>
  )
}

