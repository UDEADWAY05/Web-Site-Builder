import { useState } from 'react'
import { DraggableBlock, SideBar } from 'src/components/ui/siteNew'
import { Blocks } from 'src/components/ui/siteNew/type/type'

export function SiteNew() {
  const [projectName, setProjectName] = useState('My Project')
  const [bgColor, setBgColor] = useState('#5C90FF')
  const [blocks, setBlocks] = useState<Blocks[]>([])
  console.log(blocks)

  const addBlock = (type: string) => {
    setBlocks([
      ...blocks,
      { id: Date.now(), type, bgColor: bgColor, title: projectName },
    ])
  }

  return (
    <div className="flex">
      <SideBar
        projectName={projectName}
        setProjectName={setProjectName}
        bgColor={bgColor}
        setBgColor={setBgColor}
        addBlock={addBlock}
      />
      <DraggableBlock blocks={blocks} bgColor={bgColor} />
    </div>
  )
}
