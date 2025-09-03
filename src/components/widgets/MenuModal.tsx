import { component$, useSignal, $, Signal, useVisibleTask$ } from "@builder.io/qwik";
import { LuX, LuChevronDown, LuFacebook, LuInstagram } from "@qwikest/icons/lucide";
import { cn } from "@qwik-ui/utils";
import { useLocation } from "@builder.io/qwik-city";
import { Modal } from "../ui/Modal";
import IconHamburger from "../icons/IconHamburger";
import { buttonVariants } from "../ui/Button";

const CustomAccordion = component$(({ items, show }: { items: any[]; show: Signal<boolean> }) => {
  const openIndex = useSignal<number | null>(null);
  const location = useLocation();

  useVisibleTask$(({ track }) => {
    track(() => show.value);
    if (!show.value) {
      openIndex.value = null;
    }
  });

  const closeModal = $(() => (show.value = false));

  // Normalize paths to handle trailing slashes
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  return (
    <div class="border-t border-primary-200">
      {items.map((item, index) => {
        // Check if the current route matches the item or any subitem
        const currentPath = normalizePath(location.url.pathname);
        const isActive =
          normalizePath(item.href) === currentPath ||
          (item.hasSubmenu &&
            item.subitems?.some((subitem: any) =>
              normalizePath(subitem.href.split("#")[0]) === currentPath
            ));
        return (
          <div
            key={index}
            class={cn(
              index > 0 && "border-t border-primary-200",
              index === items.length - 1 && "border-b-0"
            )}
          >
            {item.hasSubmenu ? (
              <>
                <button
                  class={cn(
                    "!text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center justify-between w-full p-2.5 px-5",
                    isActive &&
                      "bg-primary-100 dark:bg-primary-100/80 !important text-secondary-800 dark:text-secondary-800 !important font-bold !important",
                    "hover:bg-primary-100 dark:hover:bg-primary-100/80 transition-all duration-200"
                  )}
                  onClick$={() => (openIndex.value = openIndex.value === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <LuChevronDown
                    class={cn(
                      "h-6 w-6 text-gray-500 transition-transform duration-200",
                      openIndex.value === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  class={cn(
                    "text-lg text-muted-foreground transition-all duration-500 ease-in-out max-h-0 overflow-hidden",
                    openIndex.value === index && "max-h-96"
                  )}
                >
                  <ul class="flex flex-col gap-0 pl-5">
                    {item.subitems!.map((subitem: any) => {
                      // Updated logic: Compare full href (including hash) with current pathname + hash
                      const isSubitemActive =
                        normalizePath(subitem.href) ===
                        normalizePath(location.url.pathname + (location.url.hash || ""));
                      return (
                        <li key={subitem.title} class="flex items-center">
                          <span class="text-primary-300 !text-2xs mr-3">✦</span>
                          <a
                            href={subitem.href}
                            class={cn(
                              "block text-gray-700 dark:text-gray-200 p-3 pl-1 font-medium transition-all duration-200",
                              isSubitemActive &&
                                "bg-primary-100 dark:bg-primary-100/80 !important text-secondary-800 dark:text-secondary-800 !important font-bold !important",
                              "hover:bg-primary-100 dark:hover:bg-primary-100/80"
                            )}
                            onClick$={closeModal}
                          >
                            {subitem.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            ) : (
              <a
                href={item.href}
                class={cn(
                  "block lg text-gray-700 dark:text-gray-200 p-3 px-5 font-medium transition-all duration-200",
                  isActive &&
                    "bg-primary-100 dark:bg-primary-100/80 !important text-secondary-800 dark:text-secondary-800 !important font-bold !important",
                  "hover:bg-primary-100 dark:hover:bg-primary-100/80"
                )}
                onClick$={closeModal}
              >
                <span>{item.title}</span>
                {item.badge}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
});



// ... CustomAccordion component unchanged ...

export default component$(() => {
  const show = useSignal(false);

  const menuItems = [
    { title: "This Is Us", href: "/team/", hasSubmenu: false },
    {
      title: "About",
      href: "/about/",
      hasSubmenu: true,
      subitems: [
        { title: "Our Space", href: "/about" },
        { title: "What To Expect", href: "/about#what-to-expect" },
        { title: "Benefits Of Clay", href: "/about#clay" },
        { title: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Classes",
      href: "/classes/",
      hasSubmenu: true,
      subitems: [
        { title: "Our Offerings", href: "/classes" },
        { title: "Gift Cards", href: "https://bookeo.com/earthenvessels/buyvoucher" },
      ],
    },
    { title: "Gallery", href: "/gallery/", badge: null },
    { title: "Reviews", href: "/reviews/", badge: null },
    { title: "Connections", href: "/connections/", badge: null },
  ];

  return (
    <>
      <Modal.Root bind:show={show}>
        <div class="absolute top-2 right-2 md:static">
          <Modal.Trigger
            class={cn(
              "p-1 rounded-lg border backdrop-blur-sm transition-all duration-300",
              "bg-white/35 mb-1 border-primary-300 dark:border-secondary-700 hover:shadow-xl hover:bg-white/45"
            )}
          >
            <IconHamburger class="w-8 h-8 text-primary-400 dark:text-secondary-200" />
          </Modal.Trigger>
        </div>

        <Modal.Panel
          position="left"
          class="dark:bg-gray-950 border-r border-primary-200 overflow-y-auto max-h-[100vh]"
        >
          <div class="rounded-t-2xl border-primary-200 bg-white/30 dark:bg-gray-900 p-2">
            <Modal.Title class="pt-2 pl-2.5">
              <a href="/" class="focus:outline-none">
                <div style="width: 100px; height: 40px;">
                  <img src="/images/logo2.svg" alt="Logo" />
                </div>
              </a>
            </Modal.Title>
            <Modal.Description class="!text-md !font-bold px-2.5 py-1 pb-2 dark:text-gray-200">
              <span class="bg-gradient-to-r from-primary-600 via-tertiary-600 to-primary-600 bg-clip-text text-transparent">
                Listening, Connecting & Creating
              </span>
            </Modal.Description>
          </div>

          <nav class="mt-0 space-y-4 bg-white/40 dark:bg-gray-800">
            <CustomAccordion items={menuItems} show={show} />
          </nav>

          <div class="rounded-b-2xl border-t border-primary-200 bg-white/30 dark:bg-gray-900 pb-5">
            <div class="sm:max-w-md px-5 pt-5 flex flex-row items-center justify-between gap-4 lg:justify-start lg:max-w-7xl">
              <div class="flex-shrink-0">
                <a
                  href="https://www.bookeo.com/earthenvessels"
                  class="group relative inline-flex items-center justify-center px-5 py-3 text-lg font-medium text-white bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300"
                  role="button"
                  aria-label="Book a workshop"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    Book A Class
                   
                  </span>
                  <div class="absolute inset-0 bg-gradient-to-r from-primary-300/40 via-primary-200/30 to-primary-300/40 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
              <div class="flex-shrink-0 flex gap-6">
                <a
                  href="https://www.facebook.com/p/earthen-vessels-61562702795370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <LuFacebook class="h-7 w-7" />
                </a>
                <a
                  href="https://www.instagram.com/earthenvesselsgathering/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <LuInstagram class="h-7 w-7" />
                </a>
              </div>
            </div>
            {/* Banner with Added Border */}
            <div class="mt-5 pt-5 px-5 border-t border-primary-200">
              <div
                class="w-full px-5 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gradient-to-r from-white/40 via-tertiary-100/40 to-white/40 dark:from-gray-900/40 dark:via-tertiary-900/40 dark:to-gray-900/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-2"
              >
                <div class="text-center">
                  <h3 class="text-base font-bold text-gray-800 dark:text-gray-200">Open House</h3>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-300">October 1st</p>
                  <p class="text-sm mt-1">
                    From team retreats to intimate celebrations - picture your event in this space.
                  </p>
                </div>
                <a
                  href="mailto:hello@earthenvessels.ca"
                  class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-400 via-tertiary-400 to-primary-400 rounded-md shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  role="button"
                  aria-label="Get more info about the open house"
                >
                  More Info
                </a>
              </div>
            </div>
          </div>

          <Modal.Close
            class={cn(
              buttonVariants({ size: "icon", look: "link" }),
              "absolute right-5 top-5 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
            )}
            type="submit"
          >
            <LuX class="h-7 w-7" />
          </Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});