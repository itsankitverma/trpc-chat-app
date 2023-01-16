import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { userProfile } from "../state/state";
import { useAutoSave } from "../lib/useAutoSave";

export default function UpdateProfile() {
  const [user, setUser] = useRecoilState(userProfile);
  const { handleAutoSave } = useAutoSave();

  useEffect(() => {
    handleAutoSave();
  }, [user]);

  return (
    <form className="w-full space-y-8 divide-y divide-gray-200 shadow-sm md:px-40">
      <div className="space-y-8 divide-y divide-gray-200 py-4  ">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <img src={user.image} className="h-20 rounded-full" alt="" />
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm font-semibold">{user.email}</p>
          </div>
        </div>
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  onChange={(e) => {
                    // setName(e.target.value);
                    const { id, value } = e.target;
                    if (user) {
                      setUser({
                        ...user,
                        [id]: value,
                      });
                    }
                  }}
                  id="name"
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
                  defaultValue={user?.email}
                  onChange={(e) => {
                    // setEmail(e.target.value);
                    const { id, value } = e.target;
                    if (user) {
                      setUser({
                        ...user,
                        [id]: value,
                      });
                    }
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

      <ToastContainer />
    </form>
  );
}
