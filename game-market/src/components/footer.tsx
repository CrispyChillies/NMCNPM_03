import Logo from "@/images/logo.png";
import { data, socialMedia } from "./data/data-footer";

const currentYear = new Date().getFullYear();

const footerData = data;

export function Footer() {
  return (
    <footer className="p-4 bg-card sm:p-6 dark:bg-card">
      <div className="mx-auto max-w-screen">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="mr-3 h-8"
                style={{ width: "72px", height: "72px" }}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-card-foreground dark:text-card-foreground">
                Game Market
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerData.map((section, index) => (
              <div key={index}>
                <h2 className="mb-6 text-sm font-semibold uppercase text-card-foreground dark:text-card-foreground">
                  {section.title}
                </h2>
                <ul className="text-muted-foreground dark:text-muted-foreground">
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

        <hr className="my-6 border-border sm:mx-auto dark:border-border lg:my-8" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center dark:text-muted-foreground">
            © {currentYear}{" "}
            <a href="/" className="hover:underline">
              Game Market™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
            {socialMedia.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-foreground dark:hover:text-foreground p-2 border rounded-full"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}