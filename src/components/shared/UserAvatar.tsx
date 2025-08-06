import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import type { IUser } from "../../store/authStore";

interface IProps {
  user: IUser | null;
}

export default function UserAvatar({ user }: IProps) {
  return (
    <Avatar className="shadow border">
      <AvatarImage src={user?.userImage} alt={user?.username} />
      <AvatarFallback className="text-amber-900">
        {user?.username?.slice(0, 2).toUpperCase() ?? "US"}
      </AvatarFallback>
    </Avatar>
  );
}
