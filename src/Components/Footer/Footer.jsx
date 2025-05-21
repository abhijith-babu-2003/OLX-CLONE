export default function SimpleFooter() {
  return (
    <footer className="bg-gray-700 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Cars</a></li>
              <li><a href="#" className="hover:text-white">Properties</a></li>
              <li><a href="#" className="hover:text-white">Mobiles</a></li>
              <li><a href="#" className="hover:text-white">Jobs</a></li>
              <li><a href="#" className="hover:text-white">Electronics</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-semibold mb-3">Popular Locations</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Mumbai</a></li>
              <li><a href="#" className="hover:text-white">Delhi</a></li>
              <li><a href="#" className="hover:text-white">Bangalore</a></li>
              <li><a href="#" className="hover:text-white">Chennai</a></li>
              <li><a href="#" className="hover:text-white">Kolkata</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">About OLX</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Help</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div><a href="#" className="hover:text-white">Facebook</a></div>
              <div><a href="#" className="hover:text-white">Twitter</a></div>
              <div><a href="#" className="hover:text-white">Instagram</a></div>
              <div><a href="#" className="hover:text-white">YouTube</a></div>
              <div className="mt-4">
                <span>Email: support@olx.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              © 2025 OLX. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}