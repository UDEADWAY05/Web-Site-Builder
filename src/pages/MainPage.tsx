import { child, get, getDatabase, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { transformData } from 'src/utils/transformData'

export const Main = () => {
  // временная заглушка
  const [sites, setSites] = useState([])

  useEffect(() => {
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'sites'))
      .then((snapsot) => {
        if (snapsot.exists()) {
          setSites(snapsot.val())
        } else {
          console.log('No data')
        }
      })
      .catch((err) => console.log(err))
  }, [])

  console.log(transformData(sites))

  return (
    <div data-testid="main-page">
      <p>Main</p>
    </div>
  )
}
