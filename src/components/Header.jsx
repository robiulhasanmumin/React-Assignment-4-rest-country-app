/* eslint-disable react/prop-types */
import logo from '../img/logo.png'
const Header = ({searchQuery, handleSearchChange}) => {
  return (
    <>
      <nav>
        <div className="md:flex justify-between bg-gray-800 md:px-16 py-4 fixed top-0 left-0 w-full">
          <div className='text-white flex items-center gap-2 justify-center'>
            <img className='w-10' src={logo} alt="world" />
            <h1 className='text-3xl font-bold'>Rest Country App</h1>
          </div>

          <div className="flex justify-center items-center gap-3 mt-2 md:mt-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Country"
            className="px-5 py-2 rounded-md"
          />
          </div>

        </div>
      </nav>
    </>
  )
}

export default Header
