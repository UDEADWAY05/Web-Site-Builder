// import  { ChangeEvent } from 'react'

// interface SideBarProp {
//   projectName: string
//   setProjectName: string
//   bgColor: string
//   setBgColor: (e: ChangeEvent<HTMLInputElement>) => void
//   addBlock: (str: string) => void
// }
export function SideBar({
  projectName,
  setProjectName,
  bgColor,
  setBgColor,
  addBlock,
}: {
  projectName: string
  setProjectName: (str: string) => void
  bgColor: string
  setBgColor: (str: string) => void
  addBlock: (str: string) => void
}) {
  return (
    <div className="px-3 py-2 w-[200px] bg-[#f4f4f4]">
      <p className="p-2 text-xs opacity-25">Название сайта</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <hr />
      <p className="p-2 text-xs opacity-25">Цвет фона страницы</p>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
      <hr />

      <button onClick={() => addBlock('h1')}>Добавить заголовок</button>
      <button onClick={() => addBlock('button')}>Добавить кнопку</button>
    </div>
  )
}
