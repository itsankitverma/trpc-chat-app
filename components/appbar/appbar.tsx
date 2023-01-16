import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import { userProfile } from "../../state/state";

const Appbar = () => {
  const { data: session, status } = useSession();
  const [userId] = useRecoilState(userProfile);

  const router = useRouter();

  const navigation = [{ name: "Dashboard", href: "/dashboard" }];

  return (
    <div className="mt-3 w-full py-2 md:mt-0">
      <Popover>
        <nav
          className="relative mx-auto flex items-center justify-between px-6 md:max-w-7xl"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <a
                href="#"
                onClick={() => {
                  router.push("/");
                }}
                className="flex items-center gap-2"
              >
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/maskable_icon.png"
                  alt=""
                />
                <p className="hidden md:block">MessageVerse</p>
              </a>
              <div
                className="flex md:hidden"
                onClick={() => {
                  signIn();
                }}
              >
                {status === "unauthenticated" && (
                  <a
                    href="#"
                    className="rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200"
                  >
                    Log in
                  </a>
                )}
              </div>
              {status === "authenticated" && (
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              )}
            </div>
            {status === "authenticated" && (
              <div className="hidden md:ml-10 md:block md:space-x-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="hidden text-right md:block">
            {status === "authenticated" && (
              <a
                href={`/profile`}
                className="flex w-full items-center gap-x-2 bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100"
              >
                <img
                  src={session?.user.image as string}
                  alt=""
                  className="h-8 w-8 rounded-full"
                  // onClick={() => {
                  //   router.push(`${router.pathname}/${handle}`);
                  // }}
                />
                <p className="text-gray-600">
                  {session?.user.name?.split(" ")[0]}
                </p>
              </a>
            )}
            <a
              href="#"
              className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50"
            ></a>
          </div>
          {status === "unauthenticated" && (
            <a
              href="#"
              onClick={() => {
                signIn();
              }}
              className="rounded-lg bg-gray-100 px-3 py-2 font-semibold hover:bg-gray-200"
            >
              Log in
            </a>
          )}
        </nav>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <a href={`/profile`}>
                    <img
                      src={session?.user.image as string}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  </a>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default Appbar;
