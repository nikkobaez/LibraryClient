import { FaBookOpen } from 'react-icons/fa'

const WelcomeNavbar = ({showLoginModal}) => {
    return (
        <div>
            <div className='w-screen h-20 bg-[#5494D4] flex justify-between items-center'>
                <div className='flex items-center justify-center gap-4 ml-6'>
                    <FaBookOpen size={30} color='white'/>
                    <p className='text-2xl text-white'> Book Nook </p> 
                </div>
                <div className='flex items-center justify-center gap-4 mr-6'>
                    <ul className='flex gap-6 mr-4'>
                        <li className='text-white hover:cursor-pointer'> Home </li>
                        <li className='text-white hover:cursor-pointer'> About </li>
                        <li className='text-white hover:cursor-pointer'> Contact </li>
                        <li className='text-white hover:cursor-pointer'> Features </li>
                    </ul>
                    <button onClick={showLoginModal} className='bg-[#00BBFF] text-white px-4 py-2 rounded-md'> Login </button>
                </div>
            </div>
        </div>
    )
}

export default WelcomeNavbar