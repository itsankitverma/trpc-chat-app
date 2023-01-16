import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { userProfile } from "../state/state";
import { api } from "../utils/api";

const VisitedHandle = () => {
  const [message, setMessage] = useState("");
  const [userId] = useRecoilState(userProfile);

  const { data: session } = useSession();
  const router = useRouter();
  const { handle } = router.query;

  const user = api.user.getUser.useQuery({
    handle: handle as string,
  });

  const messageList = api.user.getMessageList.useQuery({
    id: userId.id,
    handle: handle as string,
  });
  const sendMessage = api.message.message.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const placeholderAvatar = "/assets/placeholder-image.webp";
  return (
    <div className="border- relative h-screen border-2">
      <div className="">
        <div className="flex w-full  flex-col items-center justify-center">
          <div className="sticky top-0 z-10 flex w-full max-w-4xl items-center justify-between gap-2 bg-gray-200 px-2 py-5 md:px-7 ">
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
            <div className="flex cursor-pointer items-center gap-2">...</div>
          </div>
          <div className=" mt-3 w-full max-w-4xl rounded-lg ">
            {messageList.data?.map((item, id) => {
              const timestamp = item.messagedAt;
              const reviewedTime =
                (timestamp?._seconds + timestamp?._nanoseconds * 0.00000001) *
                1000;

              const newDate = new Date(reviewedTime);

              return (
                <div
                  key={id}
                  className={`flex flex-col ${
                    item?.senderId === session?.user.id
                      ? "justify-end"
                      : "justify-start"
                  } border-b-2 border-gray-400 p-2`}
                >
                  <div
                    className={`flex gap-2  
                    ${
                      item?.senderId === session?.user.id
                        ? "justify-end"
                        : "justify-start"
                    }
                    `}
                  >
                    <p className="max-w-fit bg-gray-200 p-2">{item.message}</p>
                  </div>
                  <i>
                    <Moment
                      className={`flex flex-col ${
                        item?.senderId === session?.user.id
                          ? "items-end justify-end"
                          : "items-start justify-start"
                      }  p-2`}
                      fromNow
                    >
                      {newDate}
                    </Moment>
                  </i>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 mt-5 flex w-full place-content-center gap-1 bg-white p-3">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Enter your message"
          className=" w-full max-w-3xl rounded-lg border-2 border-black p-2 pl-2"
        />
        <button
          className="rounded-lg bg-blue-500 p-2 text-white"
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
  );
};

export default VisitedHandle;
