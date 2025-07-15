'use client';
import SnippetProvider from "@/context/snippet/SnippetContext"

const LayoutSnippet = ({children}) => {
   return (
      <SnippetProvider>{children}</SnippetProvider>
   )
}

export default LayoutSnippet