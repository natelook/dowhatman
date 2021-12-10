/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { FaDiscord, FaTwitter } from 'react-icons/fa';

export default function SlideOver({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50 text-black bg-black bg-opacity-80"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 left-0 pr-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="-translate-x-full"
              enterTo="-translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="-translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-black text-white shadow-xl border-r border-white">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-3xl text-blue font-headings text-gray-900">
                        Navigation
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-green text-black p-0.5 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={setOpen}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 relative flex-1 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <ul className="uppercase text-xl space-y-5">
                        <li>
                          <Link href="/">
                            <a>Home</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/whitepaper">
                            <a>Whitepaper</a>
                          </Link>
                        </li>
                        <li className="flex justify-center space-x-10 text-3xl">
                          <Link href="https://discord.gg/kBH8EV53CG">
                            <a
                              className="hover:text-yellow transition-colors duration-200"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaDiscord />
                            </a>
                          </Link>
                          <Link href="https://twitter.com/DO_WHAT_MAN">
                            <a
                              className="hover:text-yellow transition-colors duration-200"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <FaTwitter />
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
