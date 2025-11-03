import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosClient from "@/utils/axios";
import { useToast } from "@/components/ui/toast";
import Loader from "@/components/kokonutui/loader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";

interface ChatParticipant {
  _id: string;
  userName: string;
  profileImage?: string;
  role: string;
}

interface LastMessage {
  text: string;
  sender: string;
  createdAt: string;
}

interface ChatHistoryItem {
  _id: string;
  participant: ChatParticipant;
  lastMessage: LastMessage | null;
  messageCount: number;
  updatedAt: string;
}

export default function Connections() {
  const [chats, setChats] = useState<ChatHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useToast();

  const fetchChatHistory = async () => {
    try {
      const response = await axiosClient.get("/api/chat");
      setChats(response.data.chats || []);
    } catch (err: any) {
      console.error("Error fetching chat history:", err);
      notify({
        type: "error",
        title: "Failed to load chats",
        description:
          err?.response?.data?.message || "Unable to fetch chat history",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader title="Loading connections..." subtitle="Please wait" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 mt-24 mb-40 md:mt-32 md:mb-56">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Your chat conversations with other users
        </p>
      </div>

      {chats.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">
            No conversations yet
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Start chatting with your matches from the Match page
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => (
            <Link
              key={chat._id}
              to={`/chat/${chat.participant._id || chat._id}`}
              className="block"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={chat.participant.profileImage || ""}
                        alt={chat.participant.userName}
                      />
                      <AvatarFallback className="text-lg">
                        {chat.participant.userName?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg truncate">
                          {chat.participant.userName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
                          {chat.participant.role.charAt(0).toUpperCase() +
                            chat.participant.role.slice(1)}
                        </span>
                      </div>
                      {chat.lastMessage ? (
                        <>
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage.text}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(chat.lastMessage.createdAt).toLocaleDateString()}{" "}
                            {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No messages yet
                        </p>
                      )}
                    </div>

                    {/* Message Count */}
                    <div className="text-right">
                      {chat.messageCount > 0 && (
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {chat.messageCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

