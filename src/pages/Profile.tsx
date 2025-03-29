import { useEffect, useState } from "react"
import { useFirebase } from "src/hooks/useFirebase"

export const Profile = () => {
    const firebaseService = useFirebase()
    const [data,setData] = useState()

    useEffect(() => {
        async function load(){
            const data = await firebaseService.getUserProfile('HIYd9H5gqN9BLw2nT9rW')
            
            console.log('data',data)
            
            return data
        }
        
        load().then(d => setData({id:d.id,name:d.name}))
    },[])

    return <div>Profile page {JSON.stringify(data)}</div>
}