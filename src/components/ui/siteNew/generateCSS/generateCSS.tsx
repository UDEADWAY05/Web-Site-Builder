import { selectorLayoutSiteData } from 'src/store/slices/layoutSite/selectors'
import { useAppSelector } from 'src/store/store'

export function GenerateCSS() {
  const blocks = useAppSelector(selectorLayoutSiteData)

  return (
    <div className=" outline-2 ">
      <h3 className="text-center">CSS</h3>
      {blocks
        ?.map(
          (block) =>
            `.${block.type}-${block.id}
        left: ${block.styles?.left}, 
        top: ${block.styles?.top}, 
        height: ${block.styles?.height}, 
        width: ${block.styles?.width},
        position:'absolute'`
        )
        .join('\n')}
    </div>
  )
}
