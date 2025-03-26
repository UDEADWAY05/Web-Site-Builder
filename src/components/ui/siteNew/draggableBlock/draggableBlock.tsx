import { Blocks } from '../type/type'

export function DraggableBlock({
  blocksButton,
  bgColor,
}: {
  blocksButton: Blocks[]
  bgColor: string
}) {
  return (
    <div
      className="p-10 grow min-h-screen"
      style={{ backgroundColor: bgColor }}
    >
      {!blocksButton && <p>Рабочая область пока пустая</p>}
      {blocksButton.map((block) => (
        <div key={block.id} className={`m-5 p-5 ${bgColor}border`}>
          {block.type === 'h1' && <h1>Заголовок</h1>}
          {block.type === 'button' && <button>Кнопка</button>}
        </div>
      ))}
    </div>
  )
}
