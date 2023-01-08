import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "../../utils/api";
import { useRecoilState } from "recoil";
import { userState } from "../../state/state";
import { useRouter } from "next/router";
import Appbar from "../../components/appbar/appbar";
import Moment from "react-moment";

const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Example() {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { handle } = router.query;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const placeholderAvatar = "/assets/placeholder-image.webp";
  const user = api.user.getUser.useQuery({
    handle: handle as string,
  });

  const messageList = api.user.getMessageList.useQuery({
    id: session?.user.id!,
    handle: handle as string,
  });

  const sendMessage = api.message.message.useMutation();

  return (
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
            (timestamp?._seconds! + timestamp?._nanoseconds! * 0.00000001) *
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
              id: session?.user.id!,
              name: session?.user.name!,
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
}
