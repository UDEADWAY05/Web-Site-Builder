import { selectorLayoutSiteData } from 'src/store/slices/layoutSite/selectors'
import { useAppSelector } from 'src/store/store'
import { generateCSSCode } from 'src/utils/generateCSSCode'

export function GenerateCSS() {
  const blocks = useAppSelector(selectorLayoutSiteData)

  return (
    <div className=" outline-2 ">
      <h3 className="text-center">CSS</h3>
      {blocks?.map((block) => generateCSSCode(block)).join('\n')}
    </div>
  )
}
