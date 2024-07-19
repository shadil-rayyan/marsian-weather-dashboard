// components/Navbar.js
const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-2xl font-semibold">Mars Weather Dashboard</a>
          <div>
            <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#educational-content" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Educational Content</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Quiz (Coming Soon)</a>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  