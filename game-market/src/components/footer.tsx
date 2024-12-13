import { Github, Twitter, Facebook } from 'lucide-react';
import Logo from "@/images/logo.png";
import { data } from "./data/data-footer";

const currentYear = new Date().getFullYear();

const footerData = data;

export function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="mr-3 h-8"
                style={{ width: "72px", height: "72px" }}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Game Market
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerData.map((section, index) => (
              <div key={index}>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  {section.title}
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="mb-4">
                      <a href={item.link} className="hover:underline">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear}{" "}
            <a href="/" className="hover:underline">
              Game Market™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
            <a
              href="https://facebook.com"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 border rounded-full"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 border rounded-full"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 border rounded-full"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}