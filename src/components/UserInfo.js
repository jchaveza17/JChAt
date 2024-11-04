import Avatar from '../images/blank-profile-picture-png.webp';
import { useUserStore } from '../library/userStore';

 
function UserInfo() {
    const {currentUser} = useUserStore();

    return (
        <div className="flex flex-row items-center space-x-3">
            <img className="w-10 h-10 rounded-full" src={currentUser.avatar || Avatar} alt="User Avatar" />
            <h2 className="text-lg font-medium">{currentUser.username}</h2>
        </div>
    );
}

export default UserInfo;
