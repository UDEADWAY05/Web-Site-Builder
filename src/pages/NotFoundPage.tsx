import { useNavigate } from 'react-router-dom'
import notFound from '../assets/no-book.jpg'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div data-testid="not-found-page">
      <div>
        <button
          className="flex justify-center items-center rounded-md m-2 border p-2 bg-gray-600 hover:bg-gray-700"
          onClick={() => navigate('/')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <p>Вернуться на главную страницу</p>
        </button>
      </div>
      <div className="flex flex-col justify-center items-center h-lvh">
        <h1 className="text-yellow-400 ">404</h1>
        <p> Ooops... page not found!</p>
        <img className="size-32 m-3" src={notFound} alt="page not found" />
      </div>
    </div>
  )
}
