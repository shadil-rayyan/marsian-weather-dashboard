// components/Footer.js
const Footer = () => {
    return (
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Mars Weather Dashboard. All rights reserved.</p>
          <p>Data provided by NASA's InSight Mars Weather Service API.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  