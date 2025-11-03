import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { createSocketConnection } from "@/utils/socket";
import { useAppSelector } from "@/store/appStore";
import axiosClient from "@/utils/axios";
import Loader from "@/components/kokonutui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";

interface Message {
  firstName: string;
  lastName: string;
  text: string;
  createdAt?: string;
}

export default function Chat() {
  const { targetUserId } = useParams<{ targetUserId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [otherUser, setOtherUser] = useState<any>(null);
  
  const user = useAppSelector((store) => store.authSlice.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    if (!targetUserId) {
      console.error("No target user ID provided");
      return;
    }

    try {
      const [chatResponse, userResponse] = await Promise.all([
        axiosClient.get(`/api/chat/${targetUserId}`),
        axiosClient.get(`/api/user/${targetUserId}`),
      ]);

      const chat = chatResponse.data.chat;
      const chatMessages: Message[] =
        chat?.messages?.map((msg: any) => {
          const { senderId, text } = msg;
          return {
            firstName: senderId?.userName || "Unknown",
            lastName: "",
            text: text || "",
            createdAt: msg.createdAt,
          };
        }) || [];

      setMessages(chatMessages);
      setOtherUser(userResponse.data.user);
    } catch (err: any) {
      console.error("Error fetching chat messages:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchChatMessages().finally(() => setLoading(false));
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !user || !targetUserId) {
      return;
    }

    const socket = createSocketConnection();

    // Join chat room
    socket.emit("joinChat", {
      firstName: (user as any)?.userName || user?.username || "User",
      userId,
      targetUserId,
    });

    // Listen for new messages
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text },
      ]);
    });

    // Listen for errors
    socket.on("messageError", ({ error }) => {
      setError(error);
      setTimeout(() => setError(null), 5000);
    });

    // Store socket for sending messages
    (window as any).chatSocket = socket;

    return () => {
      socket.disconnect();
      (window as any).chatSocket = null;
    };
  }, [userId, targetUserId, user]);

  // Early return if no user data
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader title="Loading chat..." subtitle="Please wait" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-white text-center">
          <p>Please log in to use chat</p>
        </div>
      </div>
    );
  }

  const sendMessage = () => {
    const chatSocket = (window as any).chatSocket;
    if (!chatSocket || !newMessage.trim() || !user) {
      return;
    }

    if (newMessage.length > 1000) {
      setError("Message too long (max 1000 characters)");
      setTimeout(() => setError(null), 5000);
      return;
    }

    chatSocket.emit("sendMessage", {
      firstName: (user as any)?.userName || user?.username || "User",
      lastName: "",
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
    setNewMessage("");
  };

  const isCurrentUser = (firstName: string) => {
    return ((user as any)?.userName || user?.username) === firstName;
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 p-4 mt-24 mb-40 md:mt-32 md:mb-56">
      {/* Header */}
      <Card className="p-4 bg-background">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={otherUser?.profileImage || ""}
                alt={otherUser?.userName || "User"}
              />
              <AvatarFallback>
                {(otherUser?.userName || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">
                {otherUser?.userName || "Chat"}
              </h2>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="p-3 bg-red-950/50 border-red-500/30">
          <p className="text-red-300 text-sm">{error}</p>
        </Card>
      )}

      {/* Messages */}
      <Card className="bg-background min-h-[500px] max-h-[600px] overflow-y-auto">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isUser = isCurrentUser(msg.firstName);
              return (
                <div
                  key={index}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg border ${
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary text-secondary-foreground rounded-bl-none"
                    }`}
                  >
                    {!isUser && (
                      <p className="text-xs font-semibold mb-1 opacity-80">
                        {msg.firstName}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {msg.createdAt && (
                      <p className="text-xs mt-1 opacity-60">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Input */}
      <Card className="bg-background p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="bg-background"
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

