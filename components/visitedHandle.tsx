import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Moment from "react-moment";
import { api } from "../utils/api";
import Appbar from "./appbar/appbar";

const VisitedHandle = () => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const { handle } = router.query;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const user = api.user.getUser.useQuery({
    handle: handle as string,
  });

  const messageList = api.user.getMessageList.useQuery({
    id: session?.user.id as string,
    handle: handle as string,
  });
  const sendMessage = api.message.message.useMutation();

  const placeholderAvatar = "/assets/placeholder-image.webp";
  return (
    <div>
      <div>
        <div className="flex w-full  flex-col items-center justify-center">
          <Appbar />

          <div className=" flex  items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img
                src={user.data?.image}
                alt=""
                className="h-10 w-10 rounded-full"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = placeholderAvatar;
                }}
              />
              <div className="flex w-full flex-col items-start">
                <p>{user.data?.name}</p>
                <p>{user.data?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">...</div>
          </div>
          <div className=" w-full max-w-4xl rounded-lg border-2 border-black">
            {messageList.data?.map((item, id) => {
              const timestamp = item.messagedAt;
              const reviewedTime =
                (timestamp?._seconds + timestamp?._nanoseconds * 0.00000001) *
                1000;

              const newDate = new Date(reviewedTime);
              return (
                <div key={id}>
                  <div
                    className={`flex gap-2 border-b-2 border-black p-2 
          ${
            item?.senderId === session?.user.id
              ? "justify-end"
              : "justify-start"
          }
          `}
                  >
                    <p className="">{item.message}</p>
                    <i>
                      <Moment fromNow className="mt-2 pr-5 text-xs capitalize">
                        {newDate}
                      </Moment>
                    </i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <input
              type="text"
              value={message}
              onChange={handleChange}
              placeholder="Enter your message"
              className=" p-2 pl-2"
            />
            <button
              className="bg-blue-500 p-2 text-white"
              onClick={() => {
                sendMessage.mutate({
                  id: session?.user.id as string,
                  name: session?.user.name as string,
                  message,
                  handle: handle as string,
                });
                setMessage("");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitedHandle;
