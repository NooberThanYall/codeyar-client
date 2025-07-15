import { Lock } from 'lucide-react'
import React from 'react'

const InputLabel = ({value, setValue, label, id, type, placeholder}) => {
  return (
              <div>
            <label htmlFor={id} className='block text-gray-300 text-sm font-medium mb-2 ml-2 text-right'>
              {label}
            </label>
            <div className='relative'>
              {/* <Lock className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} /> */}
              <input
                type={type}
                id={id}
                name={id}
                className='w-full pr-5 pl-4 py-3 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 text-right'
                placeholder={placeholder}
                value={value}
                onChange={setValue}
                required
              />
            </div>
          </div>
  )
}

export default InputLabel