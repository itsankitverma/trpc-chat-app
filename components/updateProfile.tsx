import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateProfile() {
  const updateProfile = api.user.updateUser.useMutation();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const currentUser = api.user.getCurrentUser.useQuery({
    id: session?.user.id as string,
  });

  const updated = () => toast("Details Updated.");

  return (
    <form className="space-y-8 divide-y divide-gray-200 md:px-40">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  defaultValue={currentUser.data?.name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-gray-300 px-3 py-2 pl-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  defaultValue={currentUser.data?.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-gray-300 px-3 py-2 pl-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={() => {
              updateProfile.mutate({
                id: session?.user.id as string,
                name,
                email,
              });
            }}
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
