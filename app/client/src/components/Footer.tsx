const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-600 py-4 text-center text-sm">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} PIXPRESS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
