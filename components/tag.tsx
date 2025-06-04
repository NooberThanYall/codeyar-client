interface TagProps {
  name: string
}

export function Tag({ name }: TagProps) {
  return <div className="text-red-500 hover:text-red-400 cursor-pointer">#{name}</div>
}
