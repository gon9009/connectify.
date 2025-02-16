interface LabelProps {
  children: React.ReactNode,
}

// props 에 대한 정의 
const Label = ({children}:LabelProps) => {
  return (
    <label>{children}</label>
  )
}

export default Label