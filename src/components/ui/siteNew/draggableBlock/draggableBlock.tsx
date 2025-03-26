import { Blocks } from '../type/type'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function DraggableBlock({
  blocks,
  bgColor,
}: {
  blocks: Blocks[]
  bgColor: string
}) {
  return (
    <div
      className="p-10 grow min-h-screen"
      style={{ backgroundColor: bgColor }}
    >
      {blocks.map((block) => (
        <SortableItem key={block.id} {...block} />
      ))}
    </div>
  )
}

const SortableItem = ({ id, type }: { id: number; type?: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  // console.log('style', style)
  // console.log(attributes, listeners, setNodeRef, transform, transition)
  console.log(type)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 m-2 bg-white cursor-grab"
    >
      {type === 'header' && <h1>Новый заголовок</h1>}
      {type === 'paragraph' && <p>Текст параграфа</p>}
      {type === 'listUl' && (
        <ul>
          <li>List</li>
        </ul>
      )}
      {type === 'listOl' && (
        <ol>
          <li>List</li>
        </ol>
      )}
      {type === 'image' && <img src="#" alt="image" />}
      {type === 'divider' && <hr />}
      {type === 'button' && <button>Кнопка</button>}
      {type === 'quote' && (
        <div>
          <blockquote cite="https://www.huxley.net/bnw/four.html">
            <p>
              Words can be like X-rays, if you use them properly—they’ll go
              through anything. You read and you’re pierced.
            </p>
          </blockquote>
          <p>
            —Aldous Huxley, <cite>Brave New World</cite>
          </p>
        </div>
      )}
    </div>
  )
}
