import { Outlet } from "react-router-dom"

export function AuthWrapper() {
    return (<div className="flex justify-center items-center">
          <Outlet/>
        </div>    
    )
}