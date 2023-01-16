import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userProfile } from "../../state/state";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { status } = useSession();
  const [user] = useRecoilState(userProfile);

  const router = useRouter();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div
                  className="flex flex-shrink-0 cursor-pointer items-center"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="block h-10 w-auto lg:hidden"
                      src="/maskable_icon.png"
                      alt="Your Company"
                    />
                    <p className="relative top-1 block h-10 w-auto text-lg lg:hidden">
                      MessageVerse
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="/maskable_icon.png"
                      alt="Your Company"
                    />
                    <p className="hidden md:block">Message Verse</p>
                  </div>
                </div>
                {status === "authenticated" && (
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href="#"
                      className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      Dashboard
                    </a>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                {status === "unauthenticated" && (
                  <div
                    className="flex flex-shrink-0 "
                    onClick={() => {
                      signIn();
                    }}
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="whitespace-nowrap">Log in</span>
                    </button>
                  </div>
                )}
                {status === "authenticated" && (
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={`${user.image}`}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={`/profile`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={async () => {
                                  signOut({
                                    callbackUrl: "/",
                                  });
                                }}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>
          {status === "authenticated" && (
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 pt-2 pb-3">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                >
                  Dashboard
                </Disclosure.Button>
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`${user.image}`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href={`/profile`}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    onClick={async () => {
                      signOut({
                        callbackUrl: "/",
                      });
                    }}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}
