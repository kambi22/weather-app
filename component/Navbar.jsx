import Image from 'next/image'
const Navbar = (props) => {
    return (
        <div>
            <nav className="h-20
              backdrop-blur-lg border border-white/30
             bg-white/70 items-center flex ">
                <Image src='/weather-icon.jpg'
                    className="dark:invert ms-2"
                    priority
                    height={35} width={35} alt='logo' />

                <strong className="text-white text-2xl font-bold  ms-2 ">Weather App</strong>
            </nav>
        </div>
    )
};
export default Navbar