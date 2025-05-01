interface BackgroundColorInputProps {
    value:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}

export const BackgroundColorButton = ({ value, onChange }: BackgroundColorInputProps) => {
    return (<div>
          <input
            id='backgroundColor' 
            type="color" 
            value={value}
            onChange={onChange}
            className="w-8 h-8 p-0 border-none hover:bg-slate-200"
        />
    </div>
      
    )
}